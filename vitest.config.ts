/// <reference types="vitest" />
/* eslint-disable import/no-extraneous-dependencies */
import * as path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'~': path.resolve(__dirname, 'src'),
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/Config/Test/setup.ts',
		coverage: {
			reporter: ['text', 'lcov', 'html'],
		},
	},
});
