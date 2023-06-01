import {Module} from '@nestjs/common';
import {PersonsController} from './persons.controller';
import {PersonsService} from './persons.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Persons} from "./persons.model";
import {Actors} from "../actors/actors.model";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {Helper} from "../helper/makeFilmAndPersons";
import {CacheModule} from "@nestjs/cache-manager";

@Module({
  controllers: [PersonsController],
  providers: [PersonsService, Helper],
  imports: [
  ClientsModule.register([
    {
      name: "PERSON_SERVICE",
      transport: Transport.RMQ,
      options:{
        urls: [`${process.env.RABBITMQ}`],
        queue: 'persons_queue',
        queueOptions: {
          durable: false
        },
      }
    }
  ]),
       SequelizeModule.forFeature([Persons, Actors]),
       CacheModule.register()
  ],
  exports: [
      PersonsService
  ]
})
export class PersonsModule {}
