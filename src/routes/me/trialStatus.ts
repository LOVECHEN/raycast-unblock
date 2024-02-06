import type { FastifyRequest } from 'fastify'
import { getBackendResponse } from '../../utils'
import { Debug } from '../../utils/log.util'

export async function TrialStatus(request: FastifyRequest) {
  const response = await getBackendResponse('/me/trial_status', request.headers, 'GET')
  Debug.info('[GET] /me/trial_status <-- Backend Response --> Modify Response')
  response.organizations = []
  response.trial_limits = {
    commands_limit: 999,
    quicklinks_limit: 999,
    snippets_limit: 999,
  }

  return response
}
