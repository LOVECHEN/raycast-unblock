import process from 'node:process'
import type { $Fetch } from 'ofetch'
import { ofetch } from 'ofetch'

// Disable SSL verification. (Local Server)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export const httpClient: $Fetch = ofetch.create({
  baseURL: 'https://backend.raycast.com/api/v1',
  headers: {
    'x-raycast-unblock': 'true',
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
