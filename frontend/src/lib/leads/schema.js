import { z } from 'zod'
import {
  INVESTMENT_OPTIONS,
  PROFILE_OPTIONS,
  RELATIONSHIP_OPTIONS,
} from './constants.js'

export const initialSchema = z.object({
  name: z
    .string({ required_error: 'Nome é obrigatório' })
    .trim()
    .min(3, 'Nome deve ter ao menos 3 caracteres')
    .max(150),
  email: z
    .string({ required_error: 'E-mail é obrigatório' })
    .trim()
    .email('E-mail inválido')
    .transform((value) => value.toLowerCase()),
  phone: z
    .string({ required_error: 'Telefone é obrigatório' })
    .transform((value) => value.replace(/\D/g, ''))
    .refine((value) => value.length >= 10 && value.length <= 11, {
      message: 'Telefone inválido',
    }),
})

export const modalSchema = z.object({
  relationship_status: z.enum(RELATIONSHIP_OPTIONS),
  monthly_investment: z.enum(INVESTMENT_OPTIONS),
  current_city: z
    .string({ required_error: 'Cidade é obrigatória' })
    .trim()
    .min(2, 'Informe sua cidade'),
  birth_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida')
    .optional()
    .or(z.literal('')),
  profile_type: z.enum(PROFILE_OPTIONS),
})
