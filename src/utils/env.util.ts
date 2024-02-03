import process from 'node:process'
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
