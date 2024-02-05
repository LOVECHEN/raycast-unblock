import consola from 'consola'
import type { GithubCopilotTokenAuthorization } from '../../types'
import { copilotClient } from '../../utils'
import { getCache, setCache } from '../../utils/cache.util'

const authUrl = '/copilot_internal/v2/token'

async function fetchAuth(token: string) {
  const res = await copilotClient<GithubCopilotTokenAuthorization>(authUrl, {
    headers: {
      Authorization: `token ${token}`,
    },
  })
  consola.success(`[Copilot] Auth fetched`)
  return res
}

export async function GetAuthFromToken(token: string) {
  const auth = GetAuthFromCache(token)
  if (auth)
    return auth
  else
    return setAuthToCache(await fetchAuth(token))
}

export function setAuthToCache(auth: GithubCopilotTokenAuthorization) {
  const cache = getCache('copilot', 'auth')
  setCache('copilot', 'auth', [...cache, auth])
  return auth
}

/**
 * Get auth from cache
 *
 * If the token is not in the cache, return null.
 * @param token
 */
export function GetAuthFromCache(token: string) {
  const cache = getCache('copilot', 'auth')
  const authInCache = cache.find((c: any) => c.token === token)
  const now = new Date().getTime()
  if (authInCache && new Date(authInCache.expires_at).getTime() > now) {
    return authInCache
  }
  else {
    setCache('copilot', 'auth', cache.filter((c: any) => c.token !== token))
    return null
  }
}
