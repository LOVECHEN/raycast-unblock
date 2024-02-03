import fs from 'node:fs'
import { resolve } from 'node:path'
import os from 'node:os'
import consola from 'consola'

export function getSyncFolder() {
  let syncPath = resolve(os.homedir(), 'raycast_sync')
  if (os.platform() === 'darwin')
    syncPath = resolve(os.homedir(), 'Library/Mobile Documents/com~apple~CloudDocs/RaycastSync')

  return syncPath
}

export function prepareSync() {
  consola.info('[Sync] Checking sync folder availability...')
  const syncPath = getSyncFolder()
  if (!fs.existsSync(syncPath)) {
    consola.info('[Sync] Preparing sync folder...')
    fs.mkdirSync(syncPath)
    consola.success('[Sync] Sync folder created.')
  }
  consola.success(`[Sync] Sync folder is ready.`)
}
