import { z } from "zod";

const CreateInventorySchema = z.object({
  productId: z.number(),
  quantity: z.number(),
});

type CreateInventorySchemaType = z.infer<typeof CreateInventorySchema>;

export { CreateInventorySchema, CreateInventorySchemaType };
