import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'
import { envOnlyMacros } from 'vite-env-only'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	server: {
		port: 3000,
	},
	resolve: {
		dedupe: ['react', 'react-dom'],
	},
	plugins: [envOnlyMacros(), reactRouter(), tsconfigPaths()],
})
