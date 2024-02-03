import type { FastifyRequest } from 'fastify'
import consola from 'consola'
import { GetCloudSync, PutCloudSync } from '../../features/sync/impl'

export async function GetSync(request: FastifyRequest) {
  consola.info('[GET] /me/sync --> Pro Feature Impl')
  return await GetCloudSync(request)
}

export async function PutSync(request: FastifyRequest) {
  consola.info('[PUT] /me/sync --> Pro Feature Impl')
  return PutCloudSync(request)
}
