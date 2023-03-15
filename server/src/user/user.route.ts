import  { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import prisma from "../utils/prisma";
import { loginHandler, registerUserHandler, getUsersHandler, getUser,  } from "./user.controller";
import { $ref, LoginInput } from "./user.schema";
import { findUserByEmail, findUserByNumber } from "./user.service";
import { admin } from "./userAdmin.auth";




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





}


export default userRoutes