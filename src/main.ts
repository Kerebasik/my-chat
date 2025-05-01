import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "./util/pipes/validation.pipe";

dotenv.config({ path: '.env' });

const PORT = process.env.SERVER_PORT ?? 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
}

bootstrap()
  .then(() => {
    console.log(`Server started pn port ${PORT}`);
  })
  .catch((err) => console.error(err));
