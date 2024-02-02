import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import consola from 'consola'
import { getBackendResponse } from '../../utils'

export function MeRoute(fastify: FastifyInstance, opts: Record<any, any>, done: Function) {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    consola.info('[GET] /me --> GET Backend Response')
    const backendResponse = await getBackendResponse('/me', request.headers, 'GET').catch((reason) => {
      consola.error('[GET] /me <-- Backend Response Error')
      consola.error(reason)
      return reply.send(reason)
    })
    consola.info('[GET] /me <-- Backend Response')
    return reply.send(backendResponse)
  })
  done()
}
