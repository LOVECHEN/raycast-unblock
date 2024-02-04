import process from 'node:process'
import consola from 'consola'
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { TranslateWithShortcut } from '../../features/translations/shortcuts'

export function TranslationsRoute(fastify: FastifyInstance, opts: Record<any, any>, done: Function) {
  fastify.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    consola.info('[GET] /translations --> Local Handler')
    let res
    switch (process.env.TRANSLATE_TYPE) {
      case 'shortcut':
        res = await TranslateWithShortcut(request)
        break
      default:
        res = { error: 'Invalid translate type' }
        break
    }
    consola.info('[GET] /translations <-- Local Handler')
    return reply.send(res)
  })
  done()
}
