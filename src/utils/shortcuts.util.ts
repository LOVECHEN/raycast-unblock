import { execSync } from 'node:child_process'
import fs from 'node:fs'
import { resolve } from 'node:path'
import { TMP } from '../constants'
import { execCommand } from './exec.util'
import { Debug } from './log.util'

export function listShortcuts() {
  const result = execSync('shortcuts list').toString()
  return result
}

export async function runShortcut<T>(name: string, input?: T): Promise<string> {
  let input_file

  if (input) {
    input_file = resolve(TMP, 'shortcuts', `input-${new Date().getTime()}.json`)
    fs.writeFileSync(input_file, JSON.stringify(input, null, 2))
  }
  const time = new Date().getTime()
  const output_file = resolve(TMP, 'shortcuts', `${name}-${time}.txt`)

  // shortcuts run name -i input_file -o output_file
  const command = `shortcuts run ${name} ${input ? `-i ${input_file}` : ''} -o ${output_file}`

  try {
    const { stdout: _, stderr } = await execCommand(command)
    if (stderr)
      throw new Error(`Error executing command: ${stderr}`)
    const outputData = fs.readFileSync(output_file, 'utf-8')
    return outputData
  }
  catch (error: any) {
    console.error('Error:', error.message)
    throw error
  }
}

export async function prepareShortcutRunner() {
  Debug.info('[Shortcuts] Checking shortcuts tmp folder...')
  const tmp = resolve(TMP, 'shortcuts')
  if (!fs.existsSync(tmp)) {
    fs.mkdirSync(tmp)
    Debug.success('[Shortcuts] shortcuts tmp folder created.')
  }
  Debug.success('[Shortcuts] shortcuts tmp prepared.')
}
