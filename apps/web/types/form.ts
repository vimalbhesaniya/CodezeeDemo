import { z } from "zod";

const FormSchema = z.object({
  firstname: z.string().min(2, {
    message: "Firstname is required",
  }),
});

export type FormType = z.infer<typeof FormSchema>;
