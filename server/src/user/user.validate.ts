import Joi from "@hapi/joi"


interface RegisterData {
    nome: string;
    email: string;
    password: string;
    userNumber: string;
    cpf?: string;
    birth?: string;
  }

export const registerValidate = (data:RegisterData)=>{
    const schema = Joi.object({

        nome: Joi.string().required().min(3).max(50),
        email:Joi.string().required().min(13).max(50),
        password:Joi.string().required().min(6).max(100),
        userNumber:Joi.string().required(),
        cpf:Joi.string().optional(),
        birth:Joi.string().optional(),

    })
    return schema.validate(data)
}

