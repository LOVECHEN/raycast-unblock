import type { FastifyRequest } from 'fastify'
import type { TranslateFrom, TranslateTo } from '../../types'
import { GeminiGenerateContent } from '../ai/generate/gemini'
import { getAIConfig } from '../../utils/env.util'
import { OpenaiGenerateContent } from '../ai/generate/openai'
import { generateTranslationsPrompts } from './prompts'

export async function TranslateWithAI(request: FastifyRequest): Promise<TranslateTo> {
  const body = request.body as TranslateFrom
  const prompts = generateTranslationsPrompts(body.target, body.q, getAIConfig().type)
  switch (getAIConfig().type) {
    case 'gemini':
      return {
        data: {
          translations: [
            {
              translatedText: (await GeminiGenerateContent(prompts)).content,
            },
          ],
        },
      }
    default:
      return {
        data: {
          translations: [
            {
              translatedText: (await OpenaiGenerateContent(prompts)).content,
            },
          ],
        },
      }
  }
}
