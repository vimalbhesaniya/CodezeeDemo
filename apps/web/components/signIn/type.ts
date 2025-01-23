"use client";
import { z } from "zod";
import { emailRegex, passwordRegex } from "../../utils/regex";

export const FormValuesSchema = z.object({
  email: z
    .string()
    .trim()
    .regex(emailRegex, "common.email.invalid")
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  password: z
    .string()
    .trim()
    .min(1, { message: "common.required" })
    .max(128, { message: "Password can`t be more than 128 characters" }),
});

export type FormValuesTypes = z.infer<typeof FormValuesSchema>;
