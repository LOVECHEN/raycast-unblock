declare global {
  namespace NodeJS {
    interface ProcessEnv {
      users: string
      NODE_ENV: 'development' | 'production'
      AI_TYPE: 'openai' | 'gemini' | 'custom'
      AI_API_KEY: string
      AI_ENDPOINT: string
      AI_MAX_TOKENS: string
      AI_TEMPERATURE: string
      TRANSLATE_TYPE: 'shortcut'
    }
  }
}

export { }
