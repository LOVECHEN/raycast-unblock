import 'dotenv/config'
import process from 'node:process'
import packageJson from '../package.json'
import { prepareSync } from './features/sync/pre'
import { launch } from './launch'

process.title = packageJson.name

launch()
prepareSync()
