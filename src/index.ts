import 'dotenv/config'
import process from 'node:process'
import fs from 'node:fs'
import consola from 'consola'
import packageJson from '../package.json'
import { prepareSync } from './features/sync/pre'
import { launch } from './launch'
import { checkAIConfig } from './utils/env.util'
import { DATA, TMP } from './constants'
import { prepareShortcutRunner } from './utils/shortcuts.util'
import { prepareCache } from './utils/cache.util'

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

function prepareData() {
  consola.info('[Data] Checking Data folder...')
  if (!fs.existsSync(DATA)) {
    consola.info('[Data] Preparing Data folder...')
    fs.mkdirSync(DATA)
    consola.success('[Data] Data folder created.')
  }
  consola.success('[Data] Data prepared.')
}

launch()

Promise.all([
  prepareTmp(),
  prepareData(),
  prepareSync(),
]).then(() => {
  consola.success('Root Preparation is done.')
})

Promise.all([
  prepareShortcutRunner(),
  prepareCache(),
]).then(() => {
  consola.success('Utils Preparation is done.')
})

checkAIConfig()
consola.info('Translate Type:', process.env.TRANSLATE_TYPE)
