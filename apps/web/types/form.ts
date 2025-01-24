import { z } from "zod";

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const passwordSchema = z
  .string()
  .min(8, { message: "Maximum 8 characters are allowed" })
  .refine((data) => passwordRegex.test(data), {
    message:
      "At least one letter, one number, and one special character are required",
  });

const confirmPasswordSchema = z
  .string()
  .min(8, { message: "Maximum 8 characters are allowed" })
  .refine((data) => passwordRegex.test(data), {
    message:
      "At least one letter, one number, and one special character are required",
  });

export const Schema = z
  .object({
    firstname: z
      .string()
      .min(2, {
        message: "Firstname is required",
      })
      .trim(),
    lastname: z
      .string()
      .min(2, {
        message: "Lastname is required",
      })
      .trim(),
    gender: z.enum(["male", "famale", "other"]).refine((value) => !!value, {
      message: "Gender is required",
    }),
    username: z
      .string()
      .min(8, {
        message: "Username must have lenght of 8",
      })
      .trim(),
    email: z.string().email({
      message: "Email is not valid",
    }),
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
    country: z.string().min(2, {
      message: "Country is required",
    }),
    state: z.string().min(2, {
      message: "State is required",
    }),
    street: z.string().min(2, {
      message: "Street is required",
    }),
    pincode: z
      .string()
      .min(6, {
        message: "Pincode is required",
      })
      .regex(/^\d{6}$/, "Invalid pin code. Must be 6 digits."),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Password and confirm password should match",
    path: ["confirmPassword"],
  });

export type FormType = z.infer<typeof Schema>;
