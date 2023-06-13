import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function persons() {
  const PORT = process.env.PORT || 4070;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "http://localhost:3000",
    credentials: true,// отвечает за куки
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200
  });
  const config = new DocumentBuilder()
      .setTitle('Persons microservice')
      .setDescription('Описание  API комментариев')
      .setVersion('1.0')
      .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  app.use(cookieParser());
  await app.listen(PORT, ()=> console.log(`Server Persons is started on PORT = ${PORT} `));
}

persons();
