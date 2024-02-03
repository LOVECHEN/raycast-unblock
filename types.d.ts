declare global {
  namespace NodeJS {
    interface ProcessEnv {
      users: string
    }
  }
}

export { }
