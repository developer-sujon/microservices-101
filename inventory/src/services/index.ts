import { CreateInventorySchemaType, UpdateInventorySchemaType } from "@/dto";
import prisma from "@/prisma";
import { ActionType } from "@prisma/client";

export const create = (
  createInventorySchemaType: CreateInventorySchemaType
) => {
  return prisma.stock.create({
    data: {
      productId: createInventorySchemaType.productId,
      available: createInventorySchemaType.quantity,
      histories: {
        create: {
          prevAvaliable: 0,
          quantity: createInventorySchemaType.quantity,
          avaliable: createInventorySchemaType.quantity,
          type: ActionType.ADDED,
        },
      },
    },
    select: {
      id: true,
      available: true,
    },
  });
};

export const findAll = () => {
  return prisma.stock.findMany({
    where: {},
    select: { available: true },
  });
};

export const findById = async (id: number) => {
  const inventory = await prisma.stock.findUnique({
    where: { id },
    select: { available: true },
  });

  if (!inventory) {
    throw new Error("Inventory not found");
  }

  return inventory;
};

export const findDetailsById = async (id: number) => {
  const inventory = await prisma.stock.findUnique({
    where: { id },
    include: {
      histories: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!inventory) {
    throw new Error("Inventory not found");
  }

  return inventory;
};

export const updateInventoryById = async (
  id: number,
  updateInventorySchemaType: UpdateInventorySchemaType
) => {
  const inventory = await prisma.stock.findUnique({
    where: { id },
    select: { available: true },
  });

  if (!inventory) {
    throw new Error("Inventory not found");
  }

  // calculate the new available
  let newQuantity = inventory.available || 0;

  if (updateInventorySchemaType.type === ActionType.IN) {
    newQuantity += updateInventorySchemaType.quantity;
  } else if (updateInventorySchemaType.type === ActionType.OUT) {
    if (newQuantity < updateInventorySchemaType.quantity) {
      throw new Error("Stock not available");
    }

    newQuantity -= updateInventorySchemaType.quantity;
  }

  const updateInventory = await prisma.stock.update({
    where: { id },
    data: {
      available: newQuantity,
      histories: {
        create: {
          prevAvaliable: inventory.available,
          quantity: updateInventorySchemaType.quantity,
          avaliable: newQuantity,
          type: updateInventorySchemaType.type,
        },
      },
    },
    select: {
      id: true,
      available: true,
    },
  });

  return updateInventory;
};
