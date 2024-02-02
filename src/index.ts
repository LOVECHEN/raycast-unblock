import process from 'node:process'
import Fastify from 'fastify'
import packageJson from '../package.json'
import { MeRoute } from './routes/me'

const fastify = Fastify({ logger: true })

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

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`Server listening on ${address}`)
})
