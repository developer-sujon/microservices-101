import * as inventoryController from "@/controllers";
import express, { NextFunction, Request, Response } from "express";

const app = express();

app.use(express.json());

app.post("/inventories", inventoryController.create);
app.get("/inventories", inventoryController.findAll);
app.get("/inventories/:id", inventoryController.findById);
app.get("/inventories/details/:id", inventoryController.findDetailsById);
app.patch("/inventories/:id", inventoryController.updateInventoryById);

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "UP" });
});

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

app.post("/inventories", inventoryController.create);

export default app;
