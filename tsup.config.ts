import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true, // includes *.d.ts files
  clean: true, // deletes dist/ directory before each build
  sourcemap: true,
});