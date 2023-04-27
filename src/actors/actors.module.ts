import { Module } from '@nestjs/common';
import { ActorsController } from './actors.controller';
import { ActorsService } from './actors.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Actors} from "./actors.model";
import {Persons} from "../persons/persons.model";

@Module({
  controllers: [ActorsController],
  providers: [ActorsService],
  imports: [SequelizeModule.forFeature([Persons, Actors])],
  exports: [
      ActorsService
  ]
})
export class ActorsModule {}
