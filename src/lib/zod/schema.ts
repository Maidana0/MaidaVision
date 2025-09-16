import { z } from "zod"

export const myLoginSchema = z.object({
  email: z.string().trim().email({ message: 'Correo electrónico inválido' }),
  password: z.string().trim().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
})

export const myRegisterSchema = myLoginSchema.extend({
  name: z.string().optional(),
  confirmPassword: z.string().trim().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
})
