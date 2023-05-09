import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {CorsOptions} from "@nestjs/common/interfaces/external/cors-options.interface";
import * as cors from 'cors';

async function persons() {
  const PORT = process.env.PORT || 4070;
  const app = await NestFactory.create(AppModule);
  // Использовать * для разрешения любого источника npm install --save @nestjs/platform-express cors
  const corsOptions: CorsOptions = {
    origin: '*',
  };
  app.use(cors(corsOptions));
  await app.listen(PORT, ()=> console.log(`Server Persons is started on PORT = ${PORT} `));
}

persons();
