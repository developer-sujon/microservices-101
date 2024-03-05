import { CreateInventorySchema, UpdateInventorySchema } from "@/dto";
import * as inventoryService from "@/services";

import { NextFunction, Request, Response } from "express";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parseData = await CreateInventorySchema.safeParse(req.body);

    if (!parseData.success) {
      res.status(400).json({
        message: "Validation error",
        data: parseData.error.errors,
      });
    }

    const result = await inventoryService.create(req.body);

    res.status(201).json({
      message: "Inventory create successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await inventoryService.findAll();
    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await inventoryService.findById(+req.params.id);
    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const findDetailsById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await inventoryService.findDetailsById(+req.params.id);
    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateInventoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parseData = await UpdateInventorySchema.safeParse(req.body);

    if (!parseData.success) {
      res.status(400).json({
        message: "Validation error",
        data: parseData.error.errors,
      });
    }

    const result = await inventoryService.updateInventoryById(
      +req.params.id,
      req.body
    );
    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
