import moment from "moment";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import prisma from "utils/prisma";




interface CreateBarberRequestBody {
  name: string;
  id: string;
  horarios: string;
  date:Date;
}

interface CreateScheduleRequestBody{
 user:string;
barber:string;
date:Date;
time:string;
}

export async function dayRoutes(app: FastifyInstance) {



app.get('/calendar', async (request, reply) => {
  const today = new Date();
  const dates = [];

  const authHeader = request.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    reply.code(401).send({
      message: "Token de autenticação ausente na solicitação."
    });
    return;
  }

  try {
    const decodedToken = app.jwt.verify(token) as { id: string };

  for (let i = 0; i < 7; i++) {
    const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
    dates.push(date);
  }
  reply.send(dates);
} catch (err) {
  reply.code(401).send({
    message: "Token de autenticação inválido."
  });
}
});


  app.post('/barbers', async (request: FastifyRequest, reply: FastifyReply) => {
    const { name, id, horarios } = request.body as CreateBarberRequestBody;

    try {
      const newBarber = await prisma.barbers.create({
        data: {
          id: id,
          name,

        }
      });

      reply.code(201).send({
        message: 'Perfil de barbeiro criado com sucesso!',
        barber: newBarber
      });
    } catch (err) {
      reply.code(500).send({
        message: 'Erro ao criar perfil de barbeiro'
      });
    }
  });


  app.get('/barbers', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const barbers = await prisma.barbers.findMany();
      reply.code(200).send({
        message: 'Barbeiros encontrados com sucesso!',
        barbers
      });
    } catch (err) {
      reply.code(500).send({
        message: 'Erro ao buscar barbeiros'
      });
    }
  });

  app.get('/availability', async (request, reply) => {
    const { id, date } = request.id as CreateBarberRequestBody;

    const availability = [];
    const barber = await prisma.barbers.findFirst({ where: { id: id } });

    const day = moment(date).format('YYYY-MM-DD');
    const appointments = await prisma.appointment.findMany({
      where: {
        id: id,
        date: {
          gte: moment(day).toDate(),
          lt: moment(day).add(1, 'day').toDate(),
        },
      },
    });

    const startOfDay = moment(day).hour(8).minute(0);
    const endOfDay = moment(day).hour(18).minute(0);

    while (startOfDay.isBefore(endOfDay)) {
      const time = startOfDay.format('HH:mm');
      const isAvailable = appointments.every((appt) => {
        return moment(appt.date).format('HH:mm') !== time;
      });
      availability.push({ time, isAvailable });
      startOfDay.add(30, 'minutes');
    }

    reply.send({ barber, availability });
  });

  app.post('/confirm', async (request, reply) => {
    const authHeader = request.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
      reply.code(401).send({
        message: "Token de autenticação ausente na solicitação."
      });
      return;
    }

    try {
      const decodedToken = app.jwt.verify(token) as { id: string };
      const { user, barber, date, time } = request.body as CreateScheduleRequestBody;

      const foundUser = await prisma.user.findUnique({
        where: { id: user }
      });

      const foundBarber = await prisma.barbers.findUnique({
        where: { id: barber }
      });

      if (foundUser && typeof foundUser.nome === 'string' && foundBarber && typeof foundBarber.name === 'string') {
      const newAppointment = await prisma.appointment.create({
        data: {
          user: foundUser?.nome,
          barber: foundBarber?.name,
          date,
          time
        }
      });


      reply.send({
        message: 'Agendamento confirmado com sucesso!',
        appointment: newAppointment
      });
    } else {
      // Caso o nome ou o name não sejam strings, pode-se retornar um erro ou uma mensagem de erro adequada.
      reply.code(400).send({
        message: 'Nome do usuario ou nome do barbeiro inválido.'
      });
    }

    } catch (err) {
      reply.code(401).send(err);
    }
  });


}


