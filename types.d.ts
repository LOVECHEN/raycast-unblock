import type { EnvConfig } from './src/types'

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvConfig {
      users: string
      NODE_ENV: 'development' | 'production'
    }
  }
}

export { }
