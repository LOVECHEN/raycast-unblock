/**
 * @reference https://github.com/google/generative-ai-js/blob/main/packages/main/src/requests/stream-reader.ts
 */

import { ReadableStream, TextDecoderStream } from 'node:stream/web'

const responseLineRE = /^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/

export function processStream(response: Response) {
  const input = response.body!.pipeThrough(
    new TextDecoderStream('utf-8', { fatal: true }),
  )
  const responseStream = getResponseStream(input)
  const [stream1, _] = responseStream.tee()
  return {
    stream: generateResponseSequence(stream1),
  }
}

export function getResponseStream<T = any>(inputStream: ReadableStream<string>): ReadableStream<T> {
  const reader = inputStream.getReader()
  const stream = new ReadableStream<T>({
    start(controller) {
      let currentText = ''
      return pump()
      async function pump(): Promise<(() => Promise<void>) | undefined> {
        const { value, done } = await reader.read()
        if (done) {
          if (currentText.trim()) {
            controller.error(
              new Error('Failed to parse stream: incomplete response'),
            )
            return
          }
          controller.close()
          return
        }
        currentText += value
        let match = currentText.match(responseLineRE)
        let parsedResponse: T
        while (match) {
          try {
            if (match[1] === '[DONE]') {
              controller.close()
              return
            }
            parsedResponse = JSON.parse(match[1])
          }
          catch (e_1) {
            controller.error(
              new Error(`Failed to parse stream: invalid JSON: ${match[1]}`),
            )
            return
          }
          controller.enqueue(parsedResponse)
          currentText = currentText.substring(match[0].length)
          match = currentText.match(responseLineRE)
        }
        return pump()
      }
    },
  })
  return stream
}

async function* generateResponseSequence(
  stream: ReadableStream,
): AsyncGenerator {
  const reader = stream.getReader()
  while (true) {
    const { value, done } = await reader.read()
    if (done)
      break

    yield value
  }
}
