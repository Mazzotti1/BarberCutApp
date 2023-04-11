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
  isAvailable:boolean;
}
interface BarberID {
  id:string;
  horariosDisponiveis:string[];
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



  app.post<{ Params: BarberID ; Body: BarberID}>('/barbers/:id/horarios', async (request, reply) => {
    try {
      const { id } = request.params;
      const { horariosDisponiveis } = request.body;

      horariosDisponiveis.forEach(async horario => {
        await prisma.barbers.update({
          where: { id },
          data: { horariosDisponiveis: { push: horario } },
        });
      });

      reply.send({ message: 'Horários atualizados com sucesso.' });
    } catch (err) {
      console.error(err);
      reply.status(500).send({ error: 'Erro ao salvar os horários do barbeiro' });
    }
  });

  app.get<{ Params: BarberID }>('/barbers/:id/horarios', async (request, reply) => {
    try {
      const { id } = request.params;

      const barber = await prisma.barbers.findUnique({
        where: { id },
        select: { horariosDisponiveis: true },
      });
      const horarios = barber?.horariosDisponiveis;
      reply.send(horarios);
    } catch (err) {
      console.error(err);
      reply.status(500).send({ error: 'Erro ao obter os horários do barbeiro' });
    }
  });

app.delete<{ Params: { id: string, horario: string } }>('/barbers/:id/horarios/:horario', async (request, reply) => {
  try {
    const { id, horario } = request.params;
    const barber = await prisma.barbers.findUnique({ where: { id } });

    if (!barber) {
      return reply.code(404).send({
        message: 'Barbeiro não encontrado.',
      });
    }


    const horarioIndex = barber.horariosDisponiveis.indexOf(horario);
    if (horarioIndex === -1) {
      return reply.code(404).send({
        message: 'Horário não encontrado.',
      });
    }

    const updatedHorarios = barber.horariosDisponiveis.filter(h => h !== horario);

    const updatedBarber = await prisma.barbers.update({
      where: { id },
      data: { horariosDisponiveis: updatedHorarios },
    });

    reply.code(200).send({
      message: 'Horário excluído com sucesso.',
      data: updatedBarber.horariosDisponiveis,
    });
  } catch (err) {
    reply.code(500).send({
      message: 'Erro ao excluir o horário.',
    });
  }
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
          barberId: foundBarber?.id,
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

