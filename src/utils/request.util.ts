import type { $Fetch } from 'ofetch'
import { ofetch } from 'ofetch'

export const httpClient: $Fetch = ofetch.create({
  baseURL: 'https://backend.raycast.com/api/v1',
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
