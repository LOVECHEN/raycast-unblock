import os from 'node:os'
import { resolve } from 'node:path'

export const TMP = resolve(os.tmpdir(), 'raycast_unblock')
export const TRANSLATE_SHORTCUT = 'RaycastUnblock.Translate.v1'
export const DATA = resolve(os.homedir(), '.raycast_unblock')
