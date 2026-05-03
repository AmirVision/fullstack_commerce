import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import * as process from "node:process";

const app = new Hono()

app.get('/health', (c) => {
  return c.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now()
  })
})

const start = async () => {
  try {
    serve({
      fetch: app.fetch,
      port: 8002
    }, (info) => {
      console.log("Payment service is running on port 8002")
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}
start()
