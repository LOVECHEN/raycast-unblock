declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvConfig {
      users: string
      NODE_ENV: 'development' | 'production'
    }
  }
}

export { }
