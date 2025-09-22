import { FlatCompat } from '@eslint/eslintrc';
import tseslint from 'typescript-eslint';

const compat = new FlatCompat({
	baseDirectory: import.meta.dirname,
});

export default tseslint.config(
	{
		ignores: [
            '.next/**',
            'node_modules/**',
            'public/**',
            'out/**',
            'build/**',
            'next-env.d.ts',
            'src/playwright/**',
            'src/tests/**'
        ],
	},
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	...tseslint.configs.recommended,
	{
		// Custom rules can be placed here
		rules: {
			// For example, to warn about unused variables instead of erroring
			'@typescript-eslint/no-unused-vars': 'warn',
		},
	},
);
