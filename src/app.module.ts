import { Module } from '@nestjs/common';
import { PersonsModule } from './persons/persons.module';
import { ActorsModule } from './actors/actors.module';
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import {Actors} from "./actors/actors.model";
import {Persons} from "./persons/persons.model";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {HttpModule} from "@nestjs/axios";


@Module({
  imports: [
      //npm install --save @nestjs/axios
      HttpModule.register({
          baseURL: `${process.env.APP_BASE_URL}`,
          timeout: 5000, // время ожидания ответа
          headers: { 'Access-Control-Allow-Origin': '*' }, // разрешить CORS для всех источников
      }),
      ConfigModule.forRoot({
        envFilePath: `.${process.env.NODE_ENV}.env`
      }),
      ClientsModule.register([
          {
              name: 'Profile_Service',
              transport: Transport.RMQ,
              options: {
                  urls: ['amqp://localhost:5672'],
                  queue: 'persons_queue',
                  queueOptions: {
                      durable: false
                  },
              },
          },
      ]),
      SequelizeModule.forRoot({
          dialect: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: Number(process.env.POSTGRES_PORT),
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
          models: [Actors, Persons],
          autoLoadModels: true,
          logging: true
      }),
      PersonsModule, ActorsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
