import fs from 'node:fs'
import { resolve } from 'node:path'
import consola from 'consola'
import destr from 'destr'
import { DATA } from '../constants'

export function prepareCache() {
  consola.info('[Cache] Checking cache data folder...')
  const data = resolve(DATA, 'cache')
  if (!fs.existsSync(data)) {
    consola.info('[Cache] Creating cache data folder...')
    fs.mkdirSync(data, { recursive: true })
  }
  consola.success('[Cache] Cache data folder is ready')
}

export function registCache(name: string) {
  const dataPath = resolve(DATA, 'cache', name)
  consola.info('[Cache] Registering cache data folder...')
  if (!fs.existsSync(dataPath))
    fs.writeFileSync(dataPath, '')
  consola.success(`[Cache] ${name} is registered`)
  return dataPath
}

export function getCache(name: string) {
  const dataPath = resolve(DATA, 'cache', name)
  const o = fs.readFileSync(dataPath, 'utf-8')
  return destr(o)
}

export function setFullCache(name: string, data: any) {
  const dataPath = resolve(DATA, 'cache', name)
  fs.writeFileSync(dataPath, JSON.stringify(data))
  return true
}

export function setCache(name: string, key: string, value: any) {
  const dataPath = resolve(DATA, 'cache', name)
  const o = getCache(name) as any
  o[key] = value
  fs.writeFileSync(dataPath, JSON.stringify(o))
  return true
}

export function removeCache(name: string) {
  const dataPath = resolve(DATA, 'cache', name)
  fs.unlinkSync(dataPath)
  return true
}

export function removeCacheKey(name: string, key: string) {
  const dataPath = resolve(DATA, 'cache', name)
  const o = getCache(name) as any
  delete o[key]
  fs.writeFileSync(dataPath, JSON.stringify(o))
  return true
}
