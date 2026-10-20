import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
copyFileSync('src/styles/lum.css', 'dist/lum.css')
// Vite extracts CSS; declarations should not reference the nonexistent source CSS path.
const declarations = readFileSync('dist/index.d.ts', 'utf8')
writeFileSync('dist/index.d.ts', declarations.replace("import './style.css';\n", ''))

// Optional self-hosted font registration. Core styles never import this sheet.
mkdirSync('dist/fonts', { recursive: true })
for (const file of ['Geist-Variable.woff2', 'GeistMono-Variable.woff2', 'OFL.txt', 'provenance.json']) {
  copyFileSync(`src/assets/fonts/${file}`, `dist/fonts/${file}`)
}
const fonts = readFileSync('src/styles/fonts.css', 'utf8')
writeFileSync('dist/fonts.css', fonts.replaceAll('../assets/fonts/', './fonts/'))
