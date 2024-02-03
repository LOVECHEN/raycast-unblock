import 'dotenv/config'
import process from 'node:process'
import packageJson from '../package.json'
import { prepareSync } from './features/sync/pre'
import { launch } from './launch'
import { checkAIConfig } from './utils/env.util'

process.title = packageJson.name

launch()
prepareSync()
checkAIConfig()
