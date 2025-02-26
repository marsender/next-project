import { defineConfig, configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	test: {
		globals: true, // allows to use describe, expect, it etc. without import
		environment: 'jsdom',
		setupFiles: ['./src/setupTests.ts'],
		exclude: [...configDefaults.exclude, 'src/playwright/*'],
		coverage: {
			provider: 'v8', // or 'istanbul'
			reporter: ['text', 'json', 'html'],
		},
	},
})
