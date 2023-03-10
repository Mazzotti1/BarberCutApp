import prisma from "../utils/prisma"
import {   CreatUserInput,  } from "./user.schema"
import {FastifyRequest, FastifyReply} from 'fastify'

export async function createUser(input: CreatUserInput){

    const user = await prisma.user.create({
        data:input,

    })
    return user;
}


export async function findUserByEmail(email:string) {

  return prisma.user.findUnique({
    where:{
      email,
    }
  })
}
export async function findUserByNumber(userNumber: string) {
  return prisma.user.findUnique({
    where: {
      userNumber,
    },
  });
}

export async function findUsers() {
  return prisma.user.findMany({
    select:{
      email:true,
      nome:true,
      id:true,
    }
  })
}

