import process from 'node:process'
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { TranslateWithShortcut } from '../../features/translations/shortcuts'
import { TranslateWithAI } from '../../features/translations/ai'
import { Debug } from '../../utils/log.util'
import { TranslateWithDeepLX } from '../../features/translations/deeplx'
import { TranslateWithLibreTranslate } from '../../features/translations/libre-translate'

export function TranslationsRoute(fastify: FastifyInstance, opts: Record<any, any>, done: Function) {
  fastify.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    Debug.info('[GET] /translations --> Local Handler')
    let res
    Debug.info(`[GET] /translations --> Local Handler --> ${process.env.TRANSLATE_TYPE}`)
    switch (process.env.TRANSLATE_TYPE) {
      case 'shortcut':
        res = await TranslateWithShortcut(request)
        break
      case 'ai':
        res = await TranslateWithAI(request)
        break
      case 'deeplx':
        res = await TranslateWithDeepLX(request)
        break
      case 'libre_translate':
        res = await TranslateWithLibreTranslate(request)
        break
      default:
        res = await TranslateWithAI(request)
        break
    }
    Debug.info('[GET] /translations <-- Local Handler')
    return reply.send(res)
  })
  done()
}
