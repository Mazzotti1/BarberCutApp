import moment from "moment";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import prisma from "utils/prisma";

import { deleteUser,  } from "../user/user.controller";


interface CreateBarberRequestBody {
  name: string;
  id: string;
  horarios: string;
  date:Date;
}

interface CreateScheduleRequestBody{
 user_id:string;
barber:string;
date:Date;
service:string;
time:string;

}

interface AvailabilityRequest {
  id: string;
  date: string;
}



export async function dayRoutes(app: FastifyInstance) {



  app.get('/calendar', async (request, reply) => {
    const today = new Date();
    const dates = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
      dates.push(date);
    }

    reply.send(dates);
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

  app.delete<{ Params: { id: string } }>('/barbers/:id', async (request, reply) => {
    try {
      const id = request.params.id;
      const barbers = await prisma.barbers.deleteMany({where:{id}})
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

  app.get('/availability', async (request: FastifyRequest, reply) => {
    const { id, date } = request.query as { id: string; date: string };

    if (!id || !date) {
      reply.status(400).send({ message: 'Missing parameters' });
      return;
    }

    const availability = [];
    const barber = await prisma.barbers.findFirst({ where: { id: id } });

    if (!barber) {
      reply.status(404).send({ message: 'Barber not found' });
      return;
    }

    const day = moment(date, 'YYYY-MM-DD')
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
      let isAvailable = false;
      if(time == '15:30'){
        isAvailable = true
      }else{
      appointments.forEach((appt) => {
        if (moment(appt.date).format('HH:mm') === time) {
          isAvailable = false;
        }

      });}
      availability.push({ time, isAvailable });
      startOfDay.add(90, 'minutes');
    }

    reply.send({ barber, availability });
  });




  app.post('/confirm', async (request, reply) => {


    try {

      const { user_id, barber, date, time, service, } = request.body as CreateScheduleRequestBody;

      const foundBarber = await prisma.barbers.findUnique({
        where: { id: barber }
      });

      if (foundBarber && typeof foundBarber.name === 'string' ) {
      const newAppointment = await prisma.appointment.create({
        data: {
          user_id,
          barber: foundBarber?.name,
          date,
          service,
          time,

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


  app.get<{ Params: { id: string } }>('/appointments/:id', async (request, reply) => {
    try {
      const id = request.params.id;
      const appointments = await prisma.appointment.findMany({
        where: { user_id: id }, // usar user_id ao invés de user
      });
      if (!appointments || appointments.length === 0) {
        reply.status(404).send({
          error: 'Nenhum agendamento encontrado para o usuário especificado.',
        });
        return;
      }
      reply.send(appointments);
    } catch (error) {
      reply.status(500).send({
        error: 'Erro interno do servidor.',
      });
    }
  });



}

