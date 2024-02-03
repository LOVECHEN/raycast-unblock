import { destr } from 'destr'

export function transformToString(obj: any) {
  if (typeof obj === 'object')
    return JSON.stringify(obj)

  return obj
}

export function transformToObj<T>(str: string) {
  return destr<T>(str)
}
