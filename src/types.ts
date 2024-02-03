export interface User {
  email: string
  token: string
}

export interface AIConfig {
  type: 'openai' | 'gemini' | 'custom'
  key: string
  endpoint?: string
  max_tokens?: string
  temperature: string
}

export interface TranslateFrom {
  q: string
  target: string
  format: 'text'
}

export interface TranslateTo {
  data: {
    translations: {
      translatedText: string
      detectedSourceLanguage?: string
    }[]
  }
}
