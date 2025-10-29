import tseslint from 'typescript-eslint'
import next from '@next/eslint-plugin-next'

export default [
	// Global ignores
	{
		ignores: [
			'.next/**',
			'node_modules/**',
			'public/**',
			'out/**',
			'build/**',
			'next-env.d.ts',
			'src/playwright/**',
			'src/tests/**',
		],
	},
	// Next.js config
	{
		files: ['**/*.ts', '**/*.tsx'],
		plugins: {
			'@next/next': next,
		},
		rules: {
			...next.configs.recommended.rules,
			...next.configs['core-web-vitals'].rules,
		},
	},
	// TypeScript ESLint
	...tseslint.configs.recommended,
	// Custom rules
	{
		rules: {
			'@typescript-eslint/no-unused-vars': 'warn',
		},
	},
]
