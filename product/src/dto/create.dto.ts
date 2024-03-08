import { Status } from "@prisma/client";
import { z } from "zod";

const CreateProductSchema = z.object({
  sku: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  status: z.nativeEnum(Status).optional().default(Status.DRAFT),
});

type CreateProductSchemaType = z.infer<typeof CreateProductSchema>;

export { CreateProductSchema, CreateProductSchemaType };
