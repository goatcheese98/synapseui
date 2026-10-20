import { mkdtempSync, writeFileSync, readFileSync, existsSync, readdirSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { execFileSync, spawn } from 'node:child_process'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { setTimeout as delay } from 'node:timers/promises'
import { observeFonts } from './font-probe.ts'
import type { Browser } from 'playwright'
const root = process.cwd()
const destination = mkdtempSync(join(tmpdir(), 'synapse-consumer-'))
const run = (args: string[], cwd = destination) => execFileSync('corepack', ['pnpm', ...args], { cwd, stdio: 'inherit' })
run(['pack', '--pack-destination', destination], root)
writeFileSync(join(destination, 'package.json'), JSON.stringify({ private: true, type: 'module', packageManager: 'pnpm@10.13.1', dependencies: { synapseui: `file:${join(destination, 'synapseui-1.0.0.tgz')}`, vue: '3.5.18', typescript: '5.8.3' } }))
run(['install', ...(process.env.PACKAGE_OFFLINE ? ['--offline'] : [])])
writeFileSync(join(destination, 'consumer.ts'), `import { Button, Input, buttonVariants, useDraggable, type DraggableState, type DraggableReturn } from 'synapseui'
import { h, createApp } from 'vue'
import 'synapseui/style.css'
import 'synapseui/lum.css'
const button = h(Button, { variant: 'outline', loading: false })
const input = h(Input, { modelValue: 'Name' })
const state: ReturnType<typeof useDraggable> | undefined = undefined
const check: DraggableState | DraggableReturn | undefined = state
console.log(buttonVariants({variant:'info'}), check)
createApp({render: () => h('main', {'data-synapse-theme':'dark'}, [h('h1', 'Button'), button, input, h('pre', [h('code', { style: { fontFamily: 'var(--font-mono)' } }, '<Button variant="primary">Save changes</Button>')])])}).mount('#app')
`)
run(['exec', 'tsc', '--noEmit', '--strict', '--module', 'ESNext', '--moduleResolution', 'bundler', '--target', 'ES2022', 'consumer.ts'])
execFileSync('node', ['--input-type=module', '-e', "import {Button, Input} from 'synapseui'; if (!Button || !Input) process.exit(1)"], { cwd: destination, stdio: 'inherit' })
execFileSync('node', ['-e', "const {Button, Input}=require('synapseui'); if (!Button || !Input) process.exit(1)"], { cwd: destination, stdio: 'inherit' })
const manifest: unknown = JSON.parse(readFileSync(join(destination, 'node_modules/synapseui/package.json'), 'utf8'))
if (!manifest || typeof manifest !== 'object') throw new Error('Invalid package manifest')
for (const file of ['types', 'main', 'module']) if (!existsSync(resolve(destination, 'node_modules/synapseui', String(Reflect.get(manifest, file))))) throw new Error(`Missing ${file}`)
for (const file of ['synapseui.css', 'lum.css']) if (!readFileSync(join(destination, 'node_modules/synapseui/dist', file), 'utf8').length) throw new Error(`Empty ${file}`)
writeFileSync(join(destination, 'index.html'), '<!doctype html><html lang="en"><meta charset="UTF-8"><title>Synapse package consumer</title><div id="app"></div><script type="module" src="/consumer.ts"></script></html>')
execFileSync(process.execPath, [join(root, 'node_modules/vite/bin/vite.js'), 'build'], {cwd: destination, stdio: 'inherit'})
// No font registration or downloads are imposed on consumers of the core styles.
assert(!readdirSync(join(destination, 'dist/assets')).some(file => file.endsWith('.woff2')))
const fontCss = readFileSync(join(destination, 'node_modules/synapseui/dist/fonts.css'), 'utf8')
assert.equal(fontCss.replace(/\/\*[\s\S]*?\*\//g, '').replace(/@font-face\s*\{[^}]*\}/g, '').trim(), '', 'Font opt-in must not style consumer elements')
for (const file of ['Geist-Variable.woff2', 'GeistMono-Variable.woff2']) {
  const original = readFileSync(join(root, 'src/assets/fonts', file))
  const packaged = readFileSync(join(destination, 'node_modules/synapseui/dist/fonts', file))
  assert(original.equals(packaged), `Packaged font mismatch: ${file}`)
}
assert(readFileSync(join(destination, 'node_modules/synapseui/dist/fonts/OFL.txt'), 'utf8').includes('SIL OPEN FONT LICENSE Version 1.1'))
const entry = join(destination, 'consumer.ts')
writeFileSync(entry, "import 'synapseui/fonts.css'\n" + readFileSync(entry, 'utf8'))
execFileSync(process.execPath, [join(root, 'node_modules/vite/bin/vite.js'), 'build', '--outDir', 'dist-fonts'], { cwd: destination, stdio: 'inherit' })
const emitted = readdirSync(join(destination, 'dist-fonts/assets')).filter(file => file.endsWith('.woff2'))
assert.equal(emitted.length, 2)
for (const name of emitted) {
  const data = readFileSync(join(destination, 'dist-fonts/assets', name))
  assert.equal(data.subarray(0, 4).toString('ascii'), 'wOF2')
  const hash = createHash('sha256').update(data).digest('hex')
  assert(['Geist-Variable.woff2', 'GeistMono-Variable.woff2'].some(file => createHash('sha256').update(readFileSync(join(root, 'src/assets/fonts', file))).digest('hex') === hash))
}
if (process.env.PACKAGE_BROWSER_FONTS) {
  const { chromium } = await import('playwright')
  const server = spawn(process.execPath, [join(root, 'node_modules/vite/bin/vite.js'), 'preview', '--outDir', 'dist-fonts', '--host', '127.0.0.1', '--port', '6010', '--strictPort'], { cwd: destination, stdio: 'ignore' })
  let browser: Browser | undefined
  try {
    browser = await chromium.launch({ ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}), args: ['--no-sandbox'] })
    const fallbackPage = await browser.newPage()
    const verifyFallback = observeFonts(fallbackPage)
    await fallbackPage.setContent('<h1 style="font-family:Geist,system-ui">Button</h1><pre><code style="font-family:Geist Mono,monospace">Button</code></pre>')
    await assert.rejects(() => verifyFallback('h1', 'pre code'), /Missing registered Geist FontFace entries/)
    await fallbackPage.close()
    let ready = false
    for (let attempt = 0; attempt < 75; attempt++) {
      if (server.exitCode !== null) throw new Error('Package font preview exited')
      try { ready = (await fetch('http://127.0.0.1:6010/', { signal: AbortSignal.timeout(1000) })).ok } catch { /* bounded startup */ }
      if (ready) break
      await delay(200)
    }
    assert(ready, 'Package font preview never became ready')
    const page = await browser.newPage()
    const verify = observeFonts(page)
    await page.goto('http://127.0.0.1:6010/', { waitUntil: 'networkidle' })
    const result = await verify('main h1', 'main pre code')
    mkdirSync('test-results/foundations', { recursive: true })
    writeFileSync('test-results/foundations/packaged-fonts.json', JSON.stringify({ unregisteredFallbackRejected: true, ...result }, null, 2))
    console.log('Installed-package browser font resources, loaded faces and rendered glyphs verified')
  } finally {
    await browser?.close()
    server.kill('SIGTERM')
    await Promise.race([new Promise<void>(resolve => server.once('exit', () => resolve())), delay(2000)])
    if (server.exitCode === null) server.kill('SIGKILL')
  }
}
console.log(`Package consumer verified: ${destination}`)
