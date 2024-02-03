import process from 'node:process'
import consola from 'consola'
import type { AIConfig } from '../types'

export function getAIConfig(): AIConfig {
  return {
    type: (process.env.AI_TYPE || 'openai') as AIConfig['type'],
    key: process.env.AI_API_KEY || '',
    endpoint: process.env.AI_ENDPOINT,
    max_tokens: process.env.AI_MAX_TOKENS,
    temperature: process.env.AI_TEMPERATURE || '0.5',
  }
}

export function checkAIConfig() {
  const config = getAIConfig()
  consola.info('Your AI will be using [', config.type, '] API')
  if (!config.key)
    consola.warn('AI_API_KEY is not set')
}
