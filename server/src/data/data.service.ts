
import prisma from "../utils/prisma";
import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

export async function saveResetCode(email: string, resetCode: string): Promise<void> {

    await prisma.user.update({
        where: { email },
        data: { resetCode },
      });
  }

 export async function sendResetCodeEmail(email: string, resetCode: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: String(process.env.EMAIL_USER),
      pass: String(process.env.EMAIL_PASS),
    },
  });

  const message = {
    from: String(process.env.EMAIL_PASS),
    to: email,
    subject: 'Código de redefinição de senha',
    text: `Seu código de redefinição de senha é ${resetCode}`,
  };

    await transporter.sendMail(message);
  }