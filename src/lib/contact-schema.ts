import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2).max(80),
  mobile: z.string().trim().min(7).max(20),
  email: z.string().trim().email().max(120),
  domain: z.string().min(1),
  message: z.string().trim().min(10).max(1000),
  botcheck: z.string().max(0).optional(),
});

export type ContactFormPayload = z.infer<typeof contactFormSchema>;
