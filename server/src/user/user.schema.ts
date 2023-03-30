import {optional, z} from 'zod'

import {buildJsonSchemas} from 'fastify-zod'
import prisma from '../utils/prisma'

const userCore = {
  email: z.string({

}),

nome: z.string({
    required_error:"Nome é obrigatório",
}),
userNumber: z.string().regex(/^\d{2}\d{5}\d{4}$/),
cpf: z.string().optional(),
birth: z.string().optional(),
}

const createUserSchema = z.object({
...userCore,
    password:z.string({
        required_error:"Senha é obrigatório",
        invalid_type_error: "Senha deve ser válido",
    })
})

const createUserResponseSchema = z.object({
...userCore
})

const loginSchema = z.object({
  email: z.string({
    required_error:"Email é obrigatório",
    invalid_type_error: "Email deve ser válido",
}).email("Insira um endereço de email válido"),
  password:z.string(),
})

const loginResponseSchema = z.object({
  acessToken: z.string()
})



export type CreatUserInput = z.infer<typeof createUserSchema>;

export type LoginInput = z.infer<typeof loginSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
  loginSchema,
  loginResponseSchema,

});