import { defineConfig, configDefaults } from 'vitest/config'
import path from 'path'

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	test: {
		exclude: [...configDefaults.exclude, 'src/playwright/*'],
		coverage: {
			provider: 'v8', // or 'istanbul'
			reporter: ['text', 'json', 'html'],
		},
	},
})
