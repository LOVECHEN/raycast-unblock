import consola from 'consola'
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { AIModels } from './model'

export function AIRoute(fastify: FastifyInstance, opts: Record<any, any>, done: Function) {
  fastify.get('/models', async (request: FastifyRequest, reply: FastifyReply) => {
    consola.info('[GET] /ai/models --> Local Handler')
    const model = AIModels()
    return reply.send(model)
  })

  done()
}
