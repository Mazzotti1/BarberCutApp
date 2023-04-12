
import prisma from "../utils/prisma";


import mailgun from 'mailgun-js';

export async function saveResetCode(email: string, resetCode: string): Promise<void> {
    await prisma.user.update({
        where: { email },
        data: { resetCode },
      });
  }

 export async function sendResetCodeEmail(email: string, resetCode: string): Promise<void> {
  const mg = mailgun({
    apiKey: String(process.env.API_KEY),
    domain: String(process.env.DOMAIN)
  });

  const data = {
    from: String(process.env.FROM),
    to: email,
    subject: 'Código de recuperação de senha',
    text: `Olá! Seu código de recuperação de senha é ${resetCode}. Por favor, use esse código para redefinir sua senha.`
  };

  mg.messages().send(data, (error, body) => {
    if (error) {
      console.error(error);
    } else {
      console.log(body);
    }
  });

}

export async function removeResetCode(email: string, resetCode: string) {
  setTimeout(async () => {
    await prisma.user.update({
      where: { email: email },
      data: { resetCode: null },
    });
  }, 10 * 60 * 1000);
}

export async function checkResetCode(email: string, resetCode: string): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user?.resetCode === resetCode) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(`Erro ao verificar código de recuperação de senha para o e-mail ${email}:`, error);
    throw error;
  }
}



