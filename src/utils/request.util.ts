import process from 'node:process'
import consola from 'consola'
import type { $Fetch } from 'ofetch'
import { ofetch } from 'ofetch'
import { Debug } from './log.util'

// Disable SSL verification. (Local Server)
if (process.env.MODE === 'local') {
  Debug.info('Disabling SSL verification')
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}

export const httpClient: $Fetch = ofetch.create({
  baseURL: 'https://backend.raycast.com/api/v1',
  headers: {
    ...(process.env.MODE === 'local' && {
      'x-raycast-unblock': 'true',
    }),
  },
  onRequestError: (ctx) => {
    consola.error(`[Raycast Backend] Request error`)
    console.error(ctx.error)
  },
})

export const copilotClient: $Fetch = ofetch.create({
  baseURL: 'https://api.githubcopilot.com',
  onRequest: (ctx) => {
    Debug.info(`[GitHub Copilot] Request: ${ctx.request}`)
  },
  onRequestError: (ctx) => {
    consola.error(`[GitHub Copilot] Request error`)
    console.error(ctx.error)
  },
})

export async function getBackendResponse(
  url: string,
  headers = {},
  method?: string,
  data?: any,
) {
  headers = {
    ...headers,
    host: 'backend.raycast.com',
  }
  return await httpClient(url, {
    headers,
    method: method || 'GET',
    body: data ? JSON.stringify(data) : undefined,
  })
}
