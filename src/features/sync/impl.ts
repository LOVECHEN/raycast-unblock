import fs from 'node:fs'
import { resolve } from 'node:path'
import type { FastifyRequest } from 'fastify'
import destr from 'destr'
import consola from 'consola'
import { getStore } from '../../utils/store.util'
import type { User } from '../../types'
import { getSyncFolder } from './pre'

export function GetCloudSync(request: FastifyRequest) {
  const headers = request.headers
  const token = headers.authorization
  const users = getStore<User[]>('users') || []
  const user = users.find(u => u.token === token)
  const failed = {
    updated: [],
    updated_at: null,
    deleted: [],
  }
  const filePath = resolve(getSyncFolder(), `sync-${user?.email}.json`)
  if (!user || !fs.existsSync(filePath))
    return failed

  const content = destr<any>(fs.readFileSync(filePath, 'utf-8'))
  const requestAfter = (request.query as { after?: string }).after
  if (requestAfter) {
    const after = new Date(requestAfter)
    if (after.toString() !== 'Invalid Date') {
      const updated = content.updated.filter((item: any) => {
        const updated_at = new Date(item.updated_at)
        return updated_at > after
      })
      content.updated = updated
    }
  }
  return content
}

export function PutCloudSync(request: FastifyRequest) {
  const headers = request.headers
  const body = request.body as {
    deleted: string[]
    updated_at: string
    updated: {
      client_updated_at: string
      updated_at: string
      created_at: string
      [key: string]: any
    }[]
  }
  const token = headers.authorization
  const users = getStore<User[]>('users') || []
  const user = users.find(u => u.token === token)
  const failed = {
    updated: [],
    updated_at: null,
    deleted: [],
  }
  if (!user)
    return failed

  const filePath = resolve(getSyncFolder(), `sync-${user.email}.json`)

  const bodyDeleted = body.deleted // Save for later
  body.deleted = []
  const updated_at = new Date().toISOString()
  body.updated_at = updated_at

  if (!fs.existsSync(filePath)) {
    for (const item of body.updated) {
      item.updated_at = updated_at
      item.created_at = item.client_updated_at
    }
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2))
  }
  else {
    const content = destr<any>(fs.readFileSync(filePath, 'utf-8'))
    let updated = content.updated.filter((item: any) => !bodyDeleted.includes(item.id))
    for (const item of body.updated) {
      item.updated_at = updated_at
      item.created_at = item.client_updated_at
    }
    updated = updated.concat(body.updated)
    body.updated = updated
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2))
  }

  consola.success(`[Sync] Synced with ${body.updated.length} items and ${bodyDeleted.length} deleted items. Updated at ${updated_at} - @${user.email}`)

  return {
    updated_at,
  }
}
