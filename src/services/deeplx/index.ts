import { query } from '@ifyour/deeplx'
import type { RequestParams } from '@ifyour/deeplx/dist/types'

export async function deepLXQuery(params: RequestParams) {
  return await query(params)
}
