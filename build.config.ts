import fs from 'node:fs'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  clean: true,
  hooks: {
    'build:done': async () => {
      const file = '.env'
      if (fs.existsSync(file))
        fs.copyFileSync(file, 'dist/.env')
    },
  },
})
