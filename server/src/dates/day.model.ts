import { string } from '@hapi/joi';
import { Prisma, User } from '@prisma/client';




export interface HorariosDisponiveis {
  id :string;
  data:Date;
  horario:string;
  disponivel:boolean;
}


export interface Appointment {
  id: string;
  user:string;
  barber:string;
  date:Date;
  time:string;
  status:string;


}

export interface barbers {
  id: string;
  name:string;
  horarios:string;
}

export interface Schedule{
  id:string;
  time:Date;
  barber:barbers;
  barberId:string;
}