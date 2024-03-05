import { ActionType } from "@prisma/client";
import { z } from "zod";

const UpdateInventorySchema = z.object({
  quantity: z.number(),
  type: z.nativeEnum(ActionType).default(ActionType.IN),
});

type UpdateInventorySchemaType = z.infer<typeof UpdateInventorySchema>;

export { UpdateInventorySchema, UpdateInventorySchemaType };
