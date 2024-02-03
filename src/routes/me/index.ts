import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import consola from 'consola'
import { getBackendResponse, httpClient } from '../../utils'

export function MeRoute(fastify: FastifyInstance, opts: Record<any, any>, done: Function) {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    consola.info('[GET] /me --> Backend Request')
    const backendResponse = await getBackendResponse('/me', request.headers, 'GET').catch((reason) => {
      consola.error('[GET] /me <-- Backend Response Error')
      consola.error(reason)
      return reply.send(reason)
    })
    consola.info('[GET] /me <-- Backend Response')
    return reply.send(backendResponse)
  })

  fastify.get('/*', async (request: FastifyRequest, reply: FastifyReply) => {
    consola.info('[GET] /me/* --> 激活托底策略')
    request.headers = {
      ...request.headers,
      host: 'backend.raycast.com',
    }
    const backendResponse = await getBackendResponse(`/${(request.params as any)['*']}`, request.headers, 'GET').catch((reason) => {
      consola.error(`[GET] /me/* <-- Backend Response Error`)
      consola.error(reason)
      return reply.send(reason)
    })
    consola.info('[GET] /me/* <-- Backend Response')
    return reply.send(backendResponse)
  })
  done()
}
