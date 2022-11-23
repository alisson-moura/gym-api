import { defaultExclude, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: ['build', 'node_modules'],
    coverage: {
      exclude: [...defaultExclude, 'src/data/in-memory-repositories/*', 'src/providers/fakes/*']
    }
    // ...
  },
})
