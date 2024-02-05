import OpenAI from 'openai'
import { getAIConfig } from '../../../utils/env.util'
import type { AIGenerateContent } from '../../../types'

const openai = new OpenAI({
  baseURL: getAIConfig().type === 'custom' ? getAIConfig().endpoint : undefined,
  apiKey: getAIConfig().key,
})

export async function OpenaiGenerateContent(prompt: {
  role: string
  content: string
}[], msg?: string): Promise<AIGenerateContent> {
  const message = []
  for (const m of prompt) {
    message.push({
      role: m.role,
      content: m.content,
    })
  }
  if (msg) {
    message.push({
      role: 'system',
      content: msg,
    })
  }
  const result = await openai.chat.completions.create({
    stream: false,
    messages: message as any,
    temperature: Number(getAIConfig().temperature),
    stop: null,
    n: 1,
    max_tokens: getAIConfig().max_tokens ? Number(getAIConfig().max_tokens) : undefined,
    model: 'gpt-3.5-turbo',
  })

  const text = result.choices[0].message.content!
  const split = text.split('\n')
  const detectedSourceLanguage = split[0]
  const translatedText = split[1]

  return {
    content: translatedText,
    detectedSourceLanguage,
  }
}
