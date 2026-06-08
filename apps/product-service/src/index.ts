// product-service/src/index.ts
import express, { Request, Response } from "express";
import cors from "cors";
import process from "node:process";
import { clerkMiddleware, getAuth } from "@clerk/express";

const app = express();

app.use(cors({
    origin: ["http://localhost:3002", "http://localhost:3003"],
    credentials: true,
}));

app.use(express.json());
app.use(clerkMiddleware());

app.get("/health", (req: Request, res: Response) => {
    return res.status(200).json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: Date.now()
    });
});

app.get("/test", (req: Request, res: Response) => {
    const auth = getAuth(req);
    const userId = auth.userId;

    console.log("Auth object:", auth); // Debug log
    console.log("UserId:", userId);    // Debug log

    if (!userId) {
        return res.status(401).json({
            message: "You are not logged in",
            hint: "Ensure Authorization Bearer token is passed"
        });
    }

    return res.status(200).json({
        message: "Product service authenticated",
        userId
    });
});

app.listen(8000, () => {
    console.log("Product service is running on port 8000");
});