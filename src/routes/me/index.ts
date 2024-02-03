import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import consola from 'consola'
import { getBackendResponse } from '../../utils'
import { TrialStatus } from './trialStatus'

export async function Me(request: FastifyRequest) {
  return await getBackendResponse('/me', request.headers, 'GET')
    .then((response) => {
      consola.info('[GET] /me --> Backend Response --> Modify Response')
      return {
        ...response,
        has_active_subscription: true,
        has_pro_features: true,
        has_better_ai: true,
        eligible_for_pro_features: true,
        eligible_for_ai: true,
        eligible_for_gpt4: true,
        eligible_for_ai_citations: true,
        eligible_for_developer_hub: true,
        eligible_for_application_settings: true,
        publishing_bot: true,
        can_upgrade_to_pro: false,
        admin: true,
      }
    })
}

export function MeRoute(fastify: FastifyInstance, opts: Record<any, any>, done: Function) {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    consola.info('[GET] /me --> Backend Request')
    const backendResponse = await Me(request).catch((reason) => {
      consola.error('[GET] /me <-- Backend Response Error')
      consola.error(reason)
      return reply.send(reason)
    })
    consola.info('[GET] /me <-- Backend Response')
    return reply.send(backendResponse)
  })

  fastify.get('/trial_status', async (request: FastifyRequest, reply: FastifyReply) => {
    consola.info('[GET] /me/trial_status --> Backend Request')
    const backendResponse = await TrialStatus(request).catch((reason) => {
      consola.error('[GET] /me/trial_status <-- Backend Response Error')
      consola.error(reason)
      return reply.send(reason)
    })
    consola.info('[GET] /me/trial_status <-- Backend Response')
    return reply.send(backendResponse)
  })

  fastify.get('/*', async (request: FastifyRequest, reply: FastifyReply) => {
    consola.info('[GET] /me/* --> 激活托底策略')
    request.headers = {
      ...request.headers,
      host: 'backend.raycast.com',
    }
    consola.info('[GET] /me/* --> 激活托底策略 --> Backend Request')
    const backendResponse = await getBackendResponse(`/${(request.params as any)['*']}`, request.headers, 'GET').catch((reason) => {
      consola.error(`[GET] /me/* <-- 托底策略 <-- Backend Response Error`)
      consola.error(reason)
      return reply.send(reason)
    })
    consola.info('[GET] /me/* <-- 托底策略 <-- Backend Response')
    return reply.send(backendResponse)
  })

  done()
}
