import process from 'node:process'
import Fastify from 'fastify'
import consola from 'consola'
import packageJson from '../package.json'
import { MeRoute } from './routes/me'
import { httpClient } from './utils'

process.title = packageJson.name

const fastify = Fastify({ logger: false })

const prefix = '/api/v1'
fastify.register(MeRoute, {
  prefix: `${prefix}/me`,
})

fastify.get('/', async (_request, _reply) => {
  return {
    name: packageJson.name,
    version: packageJson.version,
    author: packageJson.author,
  }
})

fastify.get('/*', async (request, reply) => {
  consola.info(`[GET] ${request.url} --> 激活托底策略`)
  request.headers = {
    ...request.headers,
    host: 'backend.raycast.com',
  }
  const backendResponse = await httpClient(`/${(request.params as any)['*']}`, {
    headers: request.headers as Record<string, string>,
    method: 'GET',
    baseURL: 'https://backend.raycast.com',
  }).catch((reason) => {
    consola.error(`[GET] ${request.url} <-- Backend Response Error`)
    consola.error(reason)
    return reply.send(reason)
  })
  consola.info(`[GET] ${request.url} <-- Backend Response`)
  return reply.send(backendResponse)
})

consola.info('Server starting...')
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    consola.error(err)
    process.exit(1)
  }
  consola.info(`Server listening on ${address}`)
})
