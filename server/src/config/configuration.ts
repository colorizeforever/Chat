import * as dotEnv from 'dotenv'

dotEnv.config()
export const mongoConfig = {
  chat: {
    connection:
    process.env.MONGO_URL,
  },
} as const;

export const jwtConfig = {
  secret: process.env.PRIVATE_KEY,
  signOptions: {
    expiresIn: "24h"
  }
} as const;