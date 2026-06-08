import Fastify from "fastify";
import process from "node:process";
import { clerkPlugin, getAuth } from "@clerk/fastify";

const fastify = Fastify({ logger: true });

fastify.register(clerkPlugin);

fastify.get("/health", (request, reply) => {
    return reply.status(200).send({
        status: "ok",
        uptime: process.uptime(),
        timestamp: Date.now(),
    });
});

fastify.get("/test", (request, reply) => {
    const auth = getAuth(request);
    const userId = auth.userId;

    console.log("Auth object:", auth);
    console.log("UserId:", userId);

    if (!userId) {
        return reply.status(401).send({
            message: "You are not logged in",
            hint: "Ensure Authorization Bearer token is passed",
        });
    }

    return reply.status(200).send({
        message: "Order service authenticated",
        userId,
    });
});

const start = async () => {
    try {
        await fastify.listen({ port: 8001 });
        console.log("Order service is running on port 8001");
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();