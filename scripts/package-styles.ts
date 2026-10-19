import { copyFileSync, readFileSync, writeFileSync } from 'node:fs'
copyFileSync('src/styles/lum.css', 'dist/lum.css')
// Vite extracts CSS; declarations should not reference the nonexistent source CSS path.
const declarations = readFileSync('dist/index.d.ts', 'utf8')
writeFileSync('dist/index.d.ts', declarations.replace("import './style.css';\n", ''))
