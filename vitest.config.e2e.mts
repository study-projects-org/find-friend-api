import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    root: './',
    environmentMatchGlobs: [['**/*.e2e-spec.ts', 'prisma']]
  },
  plugins: [
    tsConfigPaths(),
    swc.vite({ module: { type: 'es6' }, }),
  ],
});
