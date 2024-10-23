import { z } from 'zod';

export const userSchema = z
  .object({
    id: z.optional(z.number()),
    firstName: z.string(),
    lastName: z.string(),
    isActive: z.boolean()
  })
  .required();

export type UserDto = z.infer<typeof userSchema>;
