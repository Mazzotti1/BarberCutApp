import fs from 'fs';
import { FastifyInstance, FastifyRequest } from 'fastify';
import {s3} from 'aws/aws.service'
import path from 'path';

interface UploadRequest {
      path: string;
      filename: string;
  }

export async function awsRoutes(app: FastifyInstance) {

  app.post('/upload', async (request: FastifyRequest<{ Body: UploadRequest }>, reply) => {
    try {
      const filePath = request.body.path;
      const fileName = path.basename(filePath);
      const file = fs.readFileSync(filePath);

      await s3
        .putObject({
          Bucket: 'fotodeperfildousuario',
          Key: fileName,
          Body: file,
          ContentType: 'image/jpeg',
        })
        .promise();

      reply.send({ message: 'Imagem enviada com sucesso!' });
    } catch (err) {
      console.error(err);
      reply.status(500).send({ message: 'Erro ao enviar imagem' });
    }
  });



app.get('/download/:filename', async (request: FastifyRequest<{ Params: { filename: string } }>, reply) => {
    try {

      const { Body } = await s3
        .getObject({
          Bucket: 'fotodeperfildousuario',
          Key: request.params.filename,
        })
        .promise();

      reply.type('image/jpeg').send(Body);
    } catch (err) {
      console.error(err);
      reply.status(500).send({ message: 'Erro ao baixar imagem' });
    }
  });

}