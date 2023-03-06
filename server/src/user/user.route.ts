import  { FastifyInstance } from "fastify";
import prisma from "../utils/prisma";
import { loginHandler, registerUserHandler, getUsersHandler,  } from "./user.controller";
import { $ref } from "./user.schema";
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

    app.get('/', {preHandler:[app.authenticate]},getUsersHandler)


//     app.patch('/myData',{
//         preHandler:[app.authenticate],
//         schema:{
//             body: $ref('updateUserSchema'),
//             response:{200: $ref('createUserResponseSchema'),
//         },
//       },
//     },updateUserHandler)


}


export default userRoutes