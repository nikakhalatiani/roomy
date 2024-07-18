import { z } from "zod";

export const PersonalDataValidator = z.object({
    image: z.instanceof(File, { message: "Profile image is required" }),
    username: z
      .string({ required_error: "Your name is required" })
      .min(1, { message: "Your name is required" })
      .max(50, { message: "Name is too long" })
      .regex(/^[a-zA-Z\s]*$/, { message: "Name can only contain letters" })
      .includes(" ", { message: "Please enter your Full name" }),

    dob: z.date({
      required_error: "Date of birth is required",
    }),
    major: z.string({ required_error: "Your major is required" }),
    year: z.string().optional().default(""),
    minor: z.string().optional().default(""),
    morningPerson: z.boolean().default(false),
  });
  
  export type TPersonalDataValidator = z.infer<typeof PersonalDataValidator>;
  