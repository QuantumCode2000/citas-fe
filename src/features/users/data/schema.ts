import { z } from 'zod'

// const userStatusSchema = z.union([
//   z.literal('active'),
//   z.literal('inactive'),
//   z.literal('invited'),
//   z.literal('suspended'),
// ])
// export type UserStatus = z.infer<typeof userStatusSchema>

// const userRoleSchema = z.union([
//   z.literal('superadmin'),
//   z.literal('admin'),
//   z.literal('cashier'),
//   z.literal('manager'),
// ])

const userSchema = z.object({
  id: z.string(),
  nombre: z.string(), // Si este campo no siempre viene, cámbialo a z.string().optional()
  paterno: z.string(),
  materno: z.string().nullable(), // Si este campo puede ser null
  usuario: z.string(),
  email: z.string(),
  codigo_pais: z.string().nullable(),
  whatsapp: z.string().nullable(),
  ci: z.string(),
  complemento: z.string().optional().nullable(), // Puede no venir o ser null
  expedido: z.string(),
  sexo: z.string(),
  avatar: z.string().optional(),
  email_verified_at: z.coerce.date().optional().nullable(),
  estado: z.boolean(),
  // Si las fechas pueden ser null, hazlas nulas
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
  avatar_url: z.string().optional(),
})
export type User = z.infer<typeof userSchema>

export const userListSchema = z.array(userSchema)
