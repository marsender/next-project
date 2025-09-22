import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import type { Linter } from 'eslint'

const compat = new FlatCompat({
	baseDirectory: import.meta.dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
})
export default [
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	{
		ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
	},
] satisfies Linter.Config[]
