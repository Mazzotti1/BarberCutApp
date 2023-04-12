import {FastifyRequest, FastifyReply} from "fastify"
import {   CreatUserInput, LoginInput,  } from "./user.schema"
import { createUser, findUserByEmail, findUsers, findUserByNumber, findUser, findAndDelete } from "./user.service"
import bcrypt from "bcrypt"
import { app } from "../server";
import {  registerValidate } from "./user.validate";



export async function registerUserHandler(
    request: FastifyRequest<{
        Body:CreatUserInput;
    }>,
    reply: FastifyReply) {


const body = request.body
const {error} = registerValidate (body)
if (error) {
    return reply.code(400).send("Credenciais não correspondem com o exigido")
}
try {
    const hashPassword = await bcrypt.hash(request.body.password, 10)
    request.body.password = hashPassword;


     const selectedNumber = await findUserByNumber(body.userNumber)
     if (selectedNumber){
       return reply.code(400).send("Este número de telefone já está sendo utilizado")
     }

    const selectedUser = await findUserByEmail(body.email)
    if (selectedUser) {
        return reply.code(400).send("Este email já está sendo utilizado")
    }
    const user = await createUser(body)

    return reply.code(201).send("Usuário criado com sucesso")
} catch (e) {
    console.error(e)
    return reply.code(500).send()
    }
}
export async function loginHandler(request:FastifyRequest<{
    Body:LoginInput
}>, reply: FastifyReply
) {
    const body = request.body

    const user = await findUserByEmail(body.email)
    if(!user){
        return reply.code(401).send({
            message:"Email ou a senha estão incorretos"
        })
    }
    const correctPassword = await bcrypt.compare(body.password, user.password)
        if(correctPassword){
            const {password, ...rest} = user

            return {acessToken: app.jwt.sign(rest)}
  }
      return reply.code(401).send({
         message:"Email ou a senha estão incorretos"
})
}

export async function getUsersHandler(){
    const users = await findUsers()
    return users;
}


export async function getUser(id: string){
    const user = await findUser(id)
    return user;
}

export async function deleteUser(id: string){
    const user = await findAndDelete(id)
    return user;
}




