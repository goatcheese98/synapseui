import { readFile, writeFile } from 'node:fs/promises'
import { existsSync, readFileSync } from 'node:fs'

interface TestResult { status: string; error?: { message?: string }; errors?: { message?: string }[]; attachments?: { name: string; path?: string }[] }
interface Test { projectName: string; status: string; results: TestResult[] }
interface Spec { title: string; file: string; line: number; tests: Test[] }
interface Suite { title: string; specs?: Spec[]; suites?: Suite[] }
const source = process.argv[2] ?? 'test-results/results.json'
const data = JSON.parse(await readFile(source, 'utf8')) as { stats: unknown; suites: Suite[]; errors?: { message?: string }[]; attachments?: { name: string; path?: string }[] }
const tests: { file: string; line: number; title: string; project: string; status: string; result: string; reason: string; dockContext?: string }[] = []
function clean(message = '') {
  return message.replace(/\u001b\[[0-9;]*m/g, '').replaceAll(process.cwd(), '<repo>').slice(0, 1000)
}
function visit(suites: Suite[], parents: string[] = []) {
  for (const suite of suites) {
    for (const spec of suite.specs ?? []) for (const test of spec.tests) {
      const result = test.results.at(-1)
      const context = spec.file === 'drag-drop.spec.ts' && test.status !== 'expected' ? result?.attachments?.find(item => item.name === 'error-context' && item.path) : undefined
      const dockContext = context?.path && existsSync(context.path) ? clean(readFileSync(context.path, 'utf8')) : undefined
      tests.push({ dockContext, file: spec.file, line: spec.line, title: [...parents, suite.title, spec.title].filter(Boolean).join(' › '), project: test.projectName, status: test.status,
        result: result?.status ?? 'not-run', reason: clean(result?.error?.message ?? result?.errors?.[0]?.message) })
    }
    visit(suite.suites ?? [], [...parents, suite.title])
  }
}
visit(data.suites)
const summary = { stats: data.stats, errors: (data.errors ?? []).map(error => clean(error.message)), tests }
await writeFile('test-results/legacy-summary.json', JSON.stringify(summary, null, 2))
console.log('LEGACY_SUMMARY_START')
console.log(JSON.stringify(summary))
console.log('LEGACY_SUMMARY_END')
