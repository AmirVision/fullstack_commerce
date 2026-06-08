import { serve } from "@hono/node-server";
import { Hono } from "hono";
import * as process from "node:process";
import { clerkMiddleware, getAuth } from "@clerk/hono"


const app = new Hono();

// Register Clerk middleware
app.use("*", clerkMiddleware());

app.get("/health", (c) => {
  return c.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.get("/test", (c) => {
  const auth = getAuth(c);
  const userId = auth?.userId;

  console.log("Auth object:", auth);
  console.log("UserId:", userId);

  if (!userId) {
    // ✅ Hono syntax: c.json(body, status)
    return c.json(
        {
          message: "You are not logged in",
          hint: "Ensure Authorization Bearer token is passed",
        },
        401
    );
  }

  return c.json(
      {
        message: "Payment service authenticated",
        userId,
      },
      200
  );
});

const start = async () => {
  try {
    serve(
        {
          fetch: app.fetch,
          port: 8002,
        },
        (info) => {
          console.log(`Payment service is running on port ${info.port}`);
        }
    );
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

start();