// lib/utils/password.ts
import { pbkdf2Sync, randomBytes } from "crypto"

const iterations = 100_000
const keylen = 64
const digest = "sha512"

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex")
  const hash = pbkdf2Sync(password, salt, iterations, keylen, digest).toString("hex")
  return { salt, hash }
}

export function verifyPassword(password: string, hash: string, salt: string) {
  const hashed = pbkdf2Sync(password, salt, iterations, keylen, digest).toString("hex")
  return hash === hashed
}
