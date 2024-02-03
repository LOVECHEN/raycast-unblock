import consola from 'consola'
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { AIModels } from './model'
import { Completions } from './completions'

export function AIRoute(fastify: FastifyInstance, opts: Record<any, any>, done: Function) {
  fastify.get('/models', async (request: FastifyRequest, reply: FastifyReply) => {
    consola.info('[GET] /ai/models --> Local Handler')
    const model = AIModels()
    return reply.send(model)
  })

  fastify.post('/chat_completions', async (request: FastifyRequest, reply: FastifyReply) => {
    consola.info('[GET] /ai/chat_completions --> Local Handler')
    return Completions(request, reply)
  })

  done()
}
