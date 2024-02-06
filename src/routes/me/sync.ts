import type { FastifyRequest } from 'fastify'
import { GetCloudSync, PutCloudSync } from '../../features/sync/impl'
import { Debug } from '../../utils/log.util'

export async function GetSync(request: FastifyRequest) {
  Debug.info('[GET] /me/sync --> Pro Feature Impl')
  return await GetCloudSync(request)
}

export async function PutSync(request: FastifyRequest) {
  Debug.info('[PUT] /me/sync --> Pro Feature Impl')
  return PutCloudSync(request)
}
