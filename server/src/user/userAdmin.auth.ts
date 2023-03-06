import {FastifyRequest, FastifyReply} from 'fastify'

interface User{
  admin?: boolean;

}

interface CustomRequest extends FastifyRequest {
  user: User;
}

export function admin (request: CustomRequest, reply: FastifyReply, done: () => undefined) {
    const user: User = request.user
    if (user && user.admin) {
      done();
    } else {
      reply.status(401).send({ message: 'Acesso não autorizado' });
    }
  }