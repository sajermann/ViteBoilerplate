/// <reference types="vitest" />
import fs from 'node:fs';
import * as path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/config/test/setup.ts',
    coverage: {
      reporter: ['text', 'lcov', 'html'],
      exclude: [
        'src/assets/**',
        'src/index.css',
        '**/index.tsx',
        '**/*.d.ts',
        '**/types/**',
        '**/interface/**',
      ],
      include: ['src/**'],
    },
  },
  plugins: [
    // Garante que o Vitest UI sempre abra com o token de autenticação
    {
      name: 'vitest-token-auto-open',
      configureServer(server) {
        if (
          typeof server.config.server.open === 'string' &&
          server.config.server.open.startsWith('/__vitest__')
        ) {
          try {
            const tokenPath = path.join(
              process.env.LOCALAPPDATA || '',
              'vitest',
              '.vitest-secret-token',
            );
            if (fs.existsSync(tokenPath)) {
              const token = fs.readFileSync(tokenPath, 'utf-8').trim();
              server.config.server.open = `${server.config.server.open}?token=${token}`;
            }
          } catch {}
        }
      },
    },
  ],
});
