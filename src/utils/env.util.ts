import process from 'node:process'
import type { AIConfig } from '../types'

export function getAIConfig(): AIConfig {
  return {
    type: (process.env.AI_TYPE || 'openai') as AIConfig['type'],
    key: process.env.AI_KEY || '',
    endpoint: process.env.AI_ENDPOINT,
  }
}
