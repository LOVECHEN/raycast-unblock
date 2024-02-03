declare global {
  namespace NodeJS {
    interface ProcessEnv {
      users: string
      NODE_ENV: 'development' | 'production'
    }
  }
}

export { }
