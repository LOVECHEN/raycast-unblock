export interface User {
  email: string
  token: string
}

export interface EnvConfig {
  AI_TYPE: 'openai' | 'gemini' | 'custom' | 'copilot'
  AI_API_KEY: string
  AI_ENDPOINT: string
  AI_MAX_TOKENS: string
  AI_TEMPERATURE: string
  TRANSLATE_TYPE: 'shortcut' | 'ai' | 'custom' | 'github'
  TRANSLATE_API_KEY?: string
  PORT: string
}

export const KeyOfEnvConfig: (keyof EnvConfig)[] = [
  'AI_TYPE',
  'AI_API_KEY',
  'AI_ENDPOINT',
  'AI_MAX_TOKENS',
  'AI_TEMPERATURE',
  'TRANSLATE_TYPE',
  'TRANSLATE_API_KEY',
  'PORT',
]

export interface AIConfig {
  type: 'openai' | 'gemini' | 'custom'
  key: string
  endpoint?: string
  max_tokens?: string
  temperature: string
}

export interface TranslateFrom {
  source: string
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

export type TranslateShortcutBody = Pick<TranslateFrom, 'source' | 'target' | 'q'>
export interface AIGenerateContent {
  content: string
}

export interface GithubCopilotTokenAuthorization {
  token: string
  expires_at: string
}
