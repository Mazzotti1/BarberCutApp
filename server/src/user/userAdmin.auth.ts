import {FastifyRequest, FastifyReply} from 'fastify'
import { findAdminUsers,} from "./user.service"
interface User{
  admin?: boolean;

}

interface CustomRequest extends FastifyRequest {
  user: User;
}

export async function admin(){
  const users = await findAdminUsers();

  return users;
}