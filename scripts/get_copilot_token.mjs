/**
 * @reference https://raw.githubusercontent.com/aaamoon/copilot-gpt4-service/master/shells/get_copilot_token.py
 */
import { ofetch } from 'ofetch'

const request = ofetch.create({
  baseURL: 'https://github.com',
  headers: {
    'accept': 'application/json',
    'content-type': 'application/json',
  },
})

const ClientID = 'Iv1.b507a08c87ecfe98'
const Scope = 'read:user'
const LoginInfoAPI = '/login/device/code'
const AuthAPI = '/login/oauth/access_token'
const GrantType = 'urn:ietf:params:oauth:grant-type:device_code'

const loginError = {
  AUTH_PENDING: 1,
  EXPIRED_TOKEN: 2,
  NETWORK_ERROR: 3,
  OTHER_ERROR: 4,
}

async function getLoginInfo() {
  const body = {
    client_id: ClientID,
    scope: Scope,
  }
  const res = await request(LoginInfoAPI, {
    method: 'POST',
    body,
    timeout: 10000,
  }).then((v) => {
    return [null, v]
  }).catch((e) => {
    if (e.code === 'ECONNREFUSED')
      return [loginError.NETWORK_ERROR, null]
    else
      return [loginError.OTHER_ERROR, e]
  })

  return res
}

async function getAccessToken(device_code) {
  const body = {
    client_id: ClientID,
    device_code,
    grant_type: GrantType,
  }

  const res = await request(AuthAPI, {
    method: 'POST',
    body,
    timeout: 10000,
  }).then((v) => {
    if (v.error === 'authorization_pending')
      return [loginError.AUTH_PENDING, null]
    else if (v.error === 'expired_token')
      return [loginError.EXPIRED_TOKEN, null]
    else if ('access_token' in v)
      return [null, v]
    else
      return [loginError.OTHER_ERROR, v]
  }).catch((e) => {
    if (e.code === 'ECONNREFUSED')
      return [loginError.NETWORK_ERROR, null]
    else
      return [loginError.OTHER_ERROR, e]
  })

  return res
}

async function main() {
  const [err, loginInfo] = await getLoginInfo()

  if (err !== null) {
    if (err === loginError.NETWORK_ERROR) {
      console.log('network error, please check your network.')
    }
    else if (err === loginError.OTHER_ERROR) {
      console.log('unknown error occurred when getting login info.')
      console.log('error message:', loginInfo)
    }
    return [err, null]
  }

  const interval = loginInfo.interval
  console.log(`Please open ${loginInfo.verification_uri} in browser and enter ${loginInfo.user_code} to login.`)

  while (true) {
    const [err, accessToken] = await getAccessToken(loginInfo.device_code)
    if (err === null) {
      return [null, accessToken]
    }
    else if (err === loginError.AUTH_PENDING) {
      console.log('waiting for authorization...')
    }
    else if (err === loginError.EXPIRED_TOKEN) {
      console.log('session expired, please try again.')
      return [err, null]
    }
    else if (err === loginError.NETWORK_ERROR) {
      console.log('network error, please check your network.')
      return [err, null]
    }
    else if (err === loginError.OTHER_ERROR) {
      console.log('unknown error occurred when pulling auth info.')
      console.log('error message:', accessToken)
      return [err, null]
    }
    await new Promise(resolve => setTimeout(resolve, interval * 1000))
  }
}

main().then(([err, accessToken]) => {
  if (err === null)
    console.log('Your access token:', accessToken.access_token)

  else
    console.log('error:', err)
})
