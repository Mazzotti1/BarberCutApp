
import { FastifyInstance } from "fastify";
import { app } from "server";
import { saveResetCode } from "./data.service";
import { sendResetCodeEmail } from "./data.service";

interface Data {
    email: string;

  }

  export async function dataRoutes(app: FastifyInstance) {


app.post('/forgot-password', async (request, reply) => {
    const { email } = request.body as Data;


    const resetCode = Math.random().toString(36).substring(2, 8);


    await saveResetCode(email, resetCode);
    await sendResetCodeEmail(email, resetCode);

    reply.send({ message: 'Um e-mail com as instruções de redefinição de senha foi enviado para o endereço fornecido.' });
  });

}