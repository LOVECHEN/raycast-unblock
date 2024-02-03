import type { FastifyRequest } from 'fastify'
import consola from 'consola'
import { getBackendResponse } from '../../utils'

export async function TrialStatus(request: FastifyRequest) {
  const response = await getBackendResponse('/me/trial_status', request.headers, 'GET')
  consola.info('[GET] /me/trial_status <-- Backend Response --> Modify Response')
  response.organizations = []
  response.trial_limits = {
    commands_limit: 999,
    quicklinks_limit: 999,
    snippets_limit: 999,
  }

  return response
}
