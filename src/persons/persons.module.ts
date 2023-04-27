import {Module} from '@nestjs/common';
import {PersonsController} from './persons.controller';
import {PersonsService} from './persons.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Persons} from "./persons.model";
import {Actors} from "../actors/actors.model";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
  controllers: [PersonsController],
  providers: [PersonsService],
  imports: [ClientsModule.register([
    {
      name: "PERSON_SERVICE",
      transport: Transport.RMQ,
      options:{
        urls: ['amqp://localhost:5672'],
        queue: 'persons_queue',
        queueOptions: {
          durable: false
        },
      }
    }
  ]),
      SequelizeModule.forFeature([Persons, Actors]),
  ],
  exports: [
      PersonsService
  ]
})
export class PersonsModule {}
