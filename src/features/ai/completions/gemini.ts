import { GoogleGenerativeAI } from '@google/generative-ai'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { getAIConfig } from '../../../utils/env.util'

const genAI = new GoogleGenerativeAI(getAIConfig().key)
const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

export async function GeminiChatCompletion(request: FastifyRequest, reply: FastifyReply) {
  const body = request.body as {
    additional_system_instructions: string
    temperature: number
    messages: {
      content: {
        system_instructions: string
        command_instructions: string
        text: string
        temperature: number
      }
    }[]
  }
  let google_message = ''
  let temperature = Number(getAIConfig().temperature)
  const messages = body.messages
  for (const message of messages) {
    if ('system_instructions' in message.content)
      google_message += `${message.content.system_instructions}\n`

    if ('command_instructions' in message.content)
      google_message += `${message.content.command_instructions}\n`

    if ('additional_system_instructions' in body)
      google_message += `${body.additional_system_instructions}\n`

    if ('text' in message.content)
      google_message += `${message.content.text}\n`

    if ('temperature' in message.content)
      temperature = message.content.temperature
  }

  model.generationConfig = {
    ...model.generationConfig,
    temperature,
    maxOutputTokens: getAIConfig().max_tokens ? Number(getAIConfig().max_tokens) : undefined,
    candidateCount: 1,
  }
  const result = await model.generateContentStream(google_message)
  return reply.sse((async function * source() {
    try {
      for await (const data of result.stream) {
        const res = {
          text: data.text(),
        }
        yield { data: JSON.stringify(res) }
      }
    }
    catch (e: any) {
      console.error('Error: ', e.message)
      const res = {
        text: '',
        finish_reason: e.message,
      }
      yield { data: JSON.stringify(res) }
    }
    finally {
      const res = {
        text: '',
        finish_reason: 'stop',
      }
      yield { data: JSON.stringify(res) }
    }
  })())
}
