import fs from 'node:fs'
import { resolve } from 'node:path'
import os from 'node:os'
import { Debug } from '../../utils/log.util'

export function getSyncFolder() {
  let syncPath = resolve(os.homedir(), 'raycast_sync')
  if (os.platform() === 'darwin')
    syncPath = resolve(os.homedir(), 'Library/Mobile Documents/com~apple~CloudDocs/RaycastSync')

  return syncPath
}

export function prepareSync() {
  Debug.info('[Sync] Checking sync folder availability...')
  const syncPath = getSyncFolder()
  if (!fs.existsSync(syncPath)) {
    Debug.info('[Sync] Preparing sync folder...')
    fs.mkdirSync(syncPath)
    Debug.success('[Sync] Sync folder created.')
  }
  Debug.success(`[Sync] Sync folder is ready.`)
}
