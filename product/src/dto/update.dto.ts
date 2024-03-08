import { z } from "zod";
import { CreateProductSchema } from "./create.dto";

const UpdateProductSchema = CreateProductSchema.omit({ sku: true }).partial();

type UpdateProductSchemaType = z.infer<typeof UpdateProductSchema>;

export { UpdateProductSchema, UpdateProductSchemaType };
