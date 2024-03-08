import { INVENTORY_SERVICE_BASE_URL } from "@/config";
import { CreateProductSchemaType, UpdateProductSchemaType } from "@/dto";
import prisma from "@/prisma";
import axios from "axios";

export const create = async (
  createProductSchemaType: CreateProductSchemaType
) => {
  const alreadyExistProduct = await prisma.product.findUnique({
    where: {
      sku: createProductSchemaType.sku,
    },
  });

  if (alreadyExistProduct) {
    throw new Error("Product with the same SKU already exists");
  }

  // // Create product
  const product = await prisma.product.create({
    data: createProductSchemaType,
  });

  console.log("Product created successfully", product.id);

  // Create inventory record for the product

  const { data: inventory } = await axios.post(
    `${INVENTORY_SERVICE_BASE_URL}/inventories`,
    {
      productId: product.id,
      sku: product.sku,
    }
  );
  console.log("Inventory created successfully", inventory.data.id);

  // update product and store inventory id
  await prisma.product.update({
    where: { id: product.id },
    data: {
      inventoryId: inventory.id,
    },
  });
  console.log("Product updated successfully with inventory id", inventory.id);

  return { ...product, inventoryId: inventory.id };
};

export const findAll = () => {
  return prisma.product.findMany({
    select: {
      id: true,
      sku: true,
      name: true,
      price: true,
      inventoryId: true,
    },
  });
};

export const findDetailsById = async (id: number) => {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.inventoryId === null) {
    const { data: inventory } = await axios.post(
      `${INVENTORY_SERVICE_BASE_URL}/inventories`,
      {
        productId: product.id,
        sku: product.sku,
      }
    );
    console.log("Inventory created successfully", inventory.data.id);

    await prisma.product.update({
      where: { id: product.id },
      data: {
        inventoryId: inventory.id,
      },
    });
    console.log("Product updated successfully with inventory id", inventory.id);

    return {
      ...product,
      inventoryId: inventory.id,
      stock: inventory.quantity || 0,
      stockStatus: inventory.quantity > 0 ? "In stock" : "Out of stock",
    };
  }

  // fetch inventory
  const { data: inventory } = await axios.get(
    `${INVENTORY_SERVICE_BASE_URL}/inventories/${product.inventoryId}`
  );

  return {
    ...product,
    stock: inventory.quantity || 0,
    stockStatus: inventory.quantity > 0 ? "In stock" : "Out of stock",
  };
};

export const updateProductById = async (
  id: number,
  updateProductSchemaType: UpdateProductSchemaType
) => {
  // check if the product exists
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  // update the product
  const updatedProduct = await prisma.product.update({
    where: {
      id,
    },
    data: updateProductSchemaType,
  });

  return updatedProduct;
};
