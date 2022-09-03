import { storageAvatarKey, storageKey, storageLoginKey } from '../constants/storage.key';

export function getToken(): string {
  return localStorage.getItem(storageKey) || ''
}

export function destroyToken(): void {
  localStorage.removeItem(storageKey)
}

export function setToken(token: string): void {
  localStorage.setItem(storageKey, token)
}

export function setLoginInStorage(login: string): void {
  localStorage.setItem(storageLoginKey, login)
}

export function getLoginFromStorage(): string {
  return localStorage.getItem(storageLoginKey) || ''
}

export function setAvatarId(id: string): void {
  localStorage.setItem(storageAvatarKey, id)
}

export function getAvatarId(): string {
  return localStorage.getItem(storageAvatarKey) || ''
}
