import 'dotenv/config'
import process from 'node:process'
import fs from 'node:fs'
import consola from 'consola'
import packageJson from '../package.json'
import { prepareSync } from './features/sync/pre'
import { launch } from './launch'
import { checkAIConfig } from './utils/env.util'
import { TMP } from './constants'
import { prepareShortcutRunner } from './utils/shortcuts.util'

process.title = packageJson.name

function prepareTmp() {
  consola.info('[Tmp] Checking tmp folder...')
  const tmp = TMP
  if (!fs.existsSync(tmp)) {
    consola.info('[Tmp] Preparing tmp folder...')
    fs.mkdirSync(tmp)
    consola.success('[Tmp] tmp folder created.')
  }
  consola.success('[Tmp] tmp prepared.')
}

launch()

prepareTmp()
prepareSync()
prepareShortcutRunner()

checkAIConfig()
