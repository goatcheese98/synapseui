import { mkdtempSync, writeFileSync, readFileSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { execFileSync } from 'node:child_process'
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
createApp({render: () => h('main', {'data-synapse-theme':'dark'}, [button, input])}).mount('#app')
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
console.log(`Package consumer verified: ${destination}`)
