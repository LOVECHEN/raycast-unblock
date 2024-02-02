import { ofetch } from 'ofetch'

export const httpClient = ofetch.create({
  baseURL: 'https://backend.raycast.com',
})

export function getBackendResponse(
  url: string,
  headers = {},
  method?: string,
  data?: any,
) {
  return httpClient(url, {
    headers,
    method: method || 'GET',
    body: data,
  })
}
