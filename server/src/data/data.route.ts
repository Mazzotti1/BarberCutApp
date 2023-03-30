
import { FastifyInstance } from "fastify";
import { app } from "server";
import prisma from "utils/prisma";
import { saveResetCode } from "./data.service";
import { sendResetCodeEmail } from "./data.service";
import { checkResetCode } from "./data.service";
import { removeResetCode } from "./data.service";
import bcrypt from "bcrypt"

interface Data {
    email: string;

  }

  interface Reset{
    token:string;
    password:string;
  }

  export async function dataRoutes(app: FastifyInstance) {


app.post('/forgot-password', async (request, reply) => {
    const { email } = request.body as Data;


    const resetCode = Math.random().toString(36).substring(2, 8);
    const resetCodeExpiration = new Date(Date.now() + 20 * 60 * 1000);

    await saveResetCode(email, resetCode);
    await sendResetCodeEmail(email, resetCode);
    await removeResetCode(email, resetCode);


    reply.send({ message: 'Um e-mail com as instruções de redefinição de senha foi enviado para o endereço fornecido.' });
  });


  app.post('/verify-reset-code', async (request, reply) => {
    const { email, resetCode } = request.body as { email: string, resetCode: string };

    const isValidCode = await checkResetCode(email, resetCode);

    if (isValidCode) {
      reply.send({ message: 'O código de recuperação de senha é válido.' });
    } else {
      reply.status(401).send({ message: 'O código de recuperação de senha é inválido.' });
    }
  });

  app.post('/reset-password', async (request, response) => {
    const { email, password } = request.body as { email: string, password: string };

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        response.status(404).send({ message: 'Usuário não encontrado.' });
        return;
      }


    const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
      });

      response.send({ message: 'Senha atualizada com sucesso.' });
    } catch (error) {
      response.status(500).send({ message: 'Erro ao atualizar a senha.' });
    }
  });



}

