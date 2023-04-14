import fastify from "fastify";
import cors from '@fastify/cors'
import * as dotenv from 'dotenv';
import userRoutes from "./user/user.route";
import { userSchemas} from './user/user.schema'
import fjwt from "@fastify/jwt"
import { FastifyRequest ,FastifyReply } from "fastify";
import { dayRoutes } from "./dates/day.routes";
import { dataRoutes } from "./data/data.route";




export const app = fastify();



app.register(fjwt,{
    secret: String(process.env.SECRET_FJWT)
})

app.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (e) {
        return reply.send(e);
      }
    }
  );


app.get("/healthcheck", async function(){
    return {status:"OK"};
})

async function main() {

for (const schema of userSchemas){
    app.addSchema(schema)
}



dotenv.config();
app.register(cors)
app.register(userRoutes, {prefix:"/"})
app.register(dayRoutes, {prefix:"/"} )
app.register(dataRoutes, {prefix:"/"} )


try {
    await app.listen({
        port: Number(3333),
        host: '0.0.0.0'
    }).then(() => {
        console.log(`Server Running on port 3333`)
    })
} catch (e) {
    console.error(e);
    process.exit(1);
}



}
main()