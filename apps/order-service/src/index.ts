import Fastify from "fastify";
import process from "node:process";

const fastify = Fastify();

fastify.get("/health", (request, reply) => {
    return reply.status(200).send({
        status: "ok",
        uptime: process.uptime(),
        timestamp: Date.now()
    })
})

const start = async () => {
    try{
        await fastify.listen({ port : 8001 });
        console.log("Order service is running on port 8001")
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}
start();