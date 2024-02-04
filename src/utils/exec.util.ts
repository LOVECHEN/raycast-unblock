import { exec } from 'node:child_process'

export function execCommand(command: string): Promise<{ stdout: string, stderr: string }> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error)
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ stdout, stderr, error })
      else
        resolve({ stdout, stderr })
    })
  })
}
