import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { configureRoutes } from "./utils";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// routes
configureRoutes(app);

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "UP" });
});

//config routes

app.get("*", (_req: Request, res: Response) => {
  res.status(404).json({
    code: 404,
    error: "Not Found",
    message: "Resources not found",
  });
});

app.use((err, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({
    code: err.status,
    error: "Internal server error",
    message: err.message || "Internal server error",
  });
});

export default app;
