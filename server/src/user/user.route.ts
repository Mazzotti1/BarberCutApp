import  { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import prisma from "../utils/prisma";
import { loginHandler, registerUserHandler, getUsersHandler, getUser, deleteUser,  } from "./user.controller";
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
  admin:boolean;
  bairro?:string;
  numero?:string;
  complemento?:string;
  resetCode?:string;
  imagePath?:string;
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

    app.get('/admin', admin)

    app.get('/users',getUsersHandler)

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

      app.delete<{ Params: { id: string } }>('/users/:id', async (request, reply) => {
        try {
          const id = request.params.id;
          const user = await deleteUser(id);
          if (!user) {
            reply.status(404).send({
              error: 'Usuário não encontrado.',
            });
            return;
          }
          reply.send('Usuario Deletado com sucesso!');
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

      app.put<{ Params: UserUpdate }>('/users/:id', async (request, reply) => {
        const { id } = request.params;
        const imagePath: UserUpdate = request.body as UserUpdate;
        try {
          const user = await prisma.user.update({
            where: { id },
            data: imagePath,
          });
          reply.send(user.imagepath);
        } catch (err) {
          reply.status(500).send(err);
        }

      });
}


export default userRoutes