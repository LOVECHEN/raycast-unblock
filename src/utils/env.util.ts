import process from 'node:process'
import consola from 'consola'
import dotenv from 'dotenv'
import { argv } from 'zx'
import { type AIConfig, KeyOfEnvConfig } from '../types'
import { Debug } from './log.util'

export function injectEnv() {
  if (argv.help) {
    consola.log('Available options:')
    KeyOfEnvConfig.forEach((key) => {
      consola.log(`  --${key.toLowerCase()} <value>`)
    })
    process.exit(0)
  }
  let envPath = '.env'
  if (argv.env || argv.ENV)
    envPath = argv.env
  const env = dotenv.config({
    path: envPath,
  })
  // Override env from argv
  KeyOfEnvConfig.forEach((key) => {
    const argvKey = key.toLowerCase()
    if (argv[argvKey] || argv[key])
      (process.env[key] as any) = argv[argvKey]
  })
  Debug.info('Argv:', argv)
  Debug.info('Env path:', envPath)
  Debug.info('Parsed env:')
  if (process.env.DEBUG)
    // eslint-disable-next-line no-console
    console.log(env.parsed)
}

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
  Debug.info('Your AI will be using [', config.type, '] API')
  if (!config.key)
    consola.warn('AI_API_KEY is not set')
}
