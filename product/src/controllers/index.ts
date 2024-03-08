import { CreateProductSchema, UpdateProductSchema } from "@/dto";
import * as productService from "@/services";

import { NextFunction, Request, Response } from "express";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parseBody = CreateProductSchema.safeParse(req.body);

    if (!parseBody.success) {
      res.status(400).json(parseBody.error.errors);
    }

    const data = await productService.create(req.body);

    res.json({
      data,
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await productService.findAll();
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
    const result = await productService.findDetailsById(+req.params["id"]);
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
    const parseBody = UpdateProductSchema.safeParse(req.body);

    if (!parseBody.success) {
      return res.status(400).json({ errors: parseBody.error.errors });
    }

    const data = await productService.updateProductById(
      +req.params.id,
      req.body
    );

    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};
