import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import consola from 'consola'
import { getBackendResponse } from '../../utils'
import { getStore, setStore } from '../../utils/store.util'
import type { User } from '../../types'
import { TrialStatus } from './trialStatus'
import { GetSync, PutSync } from './sync'

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
      consola.error('[GET] /me <-x- Backend Response Error')
      consola.error(reason)
      return reply.send(reason)
    })
    consola.info('[GET] /me <-- Backend Response')
    const store = getStore<User[]>('users') || []
    const user = store.find(u => u.email === backendResponse.email) || null
    if (user?.token !== request.headers.authorization) {
      consola.success(`<${backendResponse.email}> is logged in.`)
      setStore('users', [
        ...getStore<User[]>('users'),
        {
          email: backendResponse.email,
          token: request.headers.authorization,
        },
      ])
    }

    return reply.send(backendResponse)
  })

  fastify.get('/trial_status', async (request: FastifyRequest, reply: FastifyReply) => {
    consola.info('[GET] /me/trial_status --> Backend Request')
    const backendResponse = await TrialStatus(request).catch((reason) => {
      consola.error('[GET] /me/trial_status <-x- Backend Response Error')
      consola.error(reason)
      return reply.send(reason)
    })
    consola.info('[GET] /me/trial_status <-- Backend Response')
    return reply.send(backendResponse)
  })

  fastify.get('/sync', async (request: FastifyRequest, reply: FastifyReply) => {
    consola.info('[GET] /me/sync --> Pro Feature Impl')
    const backendResponse = await GetSync(request).catch((reason) => {
      consola.error('[GET] /me/sync <-- Pro Feature Impl Error')
      consola.error(reason)
      return reply.send(reason)
    })
    consola.info('[GET] /me/sync <-- Pro Feature Impl Response')
    return reply.send(backendResponse)
  })

  fastify.put('/sync', async (request: FastifyRequest, reply: FastifyReply) => {
    consola.info('[PUT] /me/sync --> Pro Feature Impl')
    const backendResponse = await PutSync(request).catch((reason) => {
      consola.error('[PUT] /me/sync <-- Pro Feature Impl Error')
      consola.error(reason)
      return reply.send(reason)
    })
    consola.info('[PUT] /me/sync <-- Pro Feature Impl Response')
    return reply.send(backendResponse)
  })

  done()
}
