import  { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import prisma from "../utils/prisma";
import { loginHandler, registerUserHandler, getUsersHandler, getUser,  } from "./user.controller";
import { $ref, LoginInput } from "./user.schema";
import { findUserByEmail, findUserByNumber } from "./user.service";
import { admin } from "./userAdmin.auth";


interface UserUpdate {
  id:string;
  nome?: string;
  email?: string;
  userNumber?: string;
  cpf?: string;
  birth?: string;
  cep?:string;
  rua?:string;
  bairro?:string;
  numero?:string;
  complemento?:string;
}


async function userRoutes(app: FastifyInstance) {
    app.post('/register', {
        schema:{
            body:$ref('createUserSchema'),
            response:{
                201:$ref('createUserResponseSchema')
            }
        }
    },registerUserHandler)


    app.post('/login', {
        schema:{
            body:$ref('loginSchema'),
            response:{
                200: $ref("loginResponseSchema")
            }
        }

    }, loginHandler)





    app.get('/admin', { preHandler: [app.authenticate, admin] }, (request, reply) => {
    reply.send({ message: 'Bem vindo admin' });
    });

    app.get('/users', {preHandler:[app.authenticate]},getUsersHandler)

    app.get<{ Params: { id: string } }>('/users/:id', async (request, reply) => {
        try {
          const id = request.params.id;
          const user = await getUser(id);
          if (!user) {
            reply.status(404).send({
              error: 'Usuário não encontrado.',
            });
            return;
          }
          reply.send(user);
        } catch (error) {
          reply.status(500).send({
            error: 'Erro interno do servidor.',
          });
        }
      });

      app.patch<{ Params: UserUpdate }>('/update/:id', async (request, reply) => {
        const { id } = request.params;
        const updateData: UserUpdate = request.body as UserUpdate;

        try {
          const user = await prisma.user.update({
            where: { id },
            data: updateData,
          });
          reply.send(user);
        } catch (err) {
          reply.status(500).send(err);
        }
      });



}


export default userRoutes