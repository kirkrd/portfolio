import { includeIgnoreFile, fixupConfigRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import xoSpaceBrowser from 'eslint-config-xo/space/browser'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '.gitignore')

const flatCompat = new FlatCompat()

export default [
    includeIgnoreFile(gitignorePath),
    ...xoSpaceBrowser,
    ...fixupConfigRules(flatCompat.extends('eslint-config-xo-react/space')),
]
