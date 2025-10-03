import type { Handler } from '@netlify/functions'

export const handler: Handler = async () => {
  console.log('Weekly snapshot running at', new Date().toISOString())
  return { statusCode: 200, body: JSON.stringify({ ok: true }) }
}
