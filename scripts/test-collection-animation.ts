import { strict as assert } from 'node:assert'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { setTimeout as delay } from 'node:timers/promises'

const require = createRequire(import.meta.url)
const envFile = join(dirname(require.resolve('histoire')), 'dom/env.js')
const { createDomEnv } = await import(pathToFileURL(envFile).href) as { createDomEnv(): { destroy(): void } }
const nativeAtob = globalThis.atob
const environment = createDomEnv()
try {
  assert.equal(globalThis.atob, nativeAtob, 'Keep the native decoder used internally by JSDOM')
  assert.equal(atob('U3luYXBzZQ=='), 'Synapse', 'The collection decoder must not recurse')
  const nextFrame = globalThis.requestAnimationFrame
  const { gsap } = await import('gsap')
  gsap.to({ x: 0 }, { x: 10, duration: 10 })
  const running = gsap.ticker.frame
  await new Promise<void>(resolve => nextFrame(() => resolve()))
  assert(gsap.ticker.frame > running, 'Real animations run before collection teardown')
  let survived = false
  nextFrame(() => { survived = true })
  const stopped = gsap.ticker.frame
  environment.destroy()
  assert.equal(typeof globalThis.cancelAnimationFrame, 'undefined', 'The collection globals were removed')
  // Observe several real JSDOM frame periods after teardown, not a product delay.
  await delay(64)
  assert.equal(survived, false, 'Collection teardown cancels its real window frame queue')
  assert.equal(gsap.ticker.frame, stopped, 'No GSAP callback survives the collection window')
  assert.equal(globalThis.atob, nativeAtob, 'Native Node globals remain intact')
  console.log('Real Histoire/JSDOM teardown stops animation callbacks and preserves native decoding')
} finally {
  environment.destroy()
}
