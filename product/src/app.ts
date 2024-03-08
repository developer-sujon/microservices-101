import * as productController from "@/controllers";
import express, { NextFunction, Request, Response } from "express";

const app = express();

app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "UP" });
});

app.post("/products", productController.create);
app.get("/products", productController.findAll);
app.get("/products/details/:id", productController.findDetailsById);
app.patch("/products/:id", productController.updateInventoryById);

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

app.post("/inventories", productController.create);

export default app;
