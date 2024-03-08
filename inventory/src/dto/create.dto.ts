import { z } from "zod";

const CreateInventorySchema = z.object({
  productId: z.number(),
  quantity: z.number().default(0),
});

type CreateInventorySchemaType = z.infer<typeof CreateInventorySchema>;

export { CreateInventorySchema, CreateInventorySchemaType };
