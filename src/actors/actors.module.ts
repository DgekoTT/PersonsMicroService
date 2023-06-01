import { Module} from '@nestjs/common';
import { ActorsController } from './actors.controller';
import { ActorsService } from './actors.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Actors} from "./actors.model";
import {Persons} from "../persons/persons.model";
import {JwtModule} from "@nestjs/jwt";
import {CacheModule} from "@nestjs/cache-manager";

@Module({
  controllers: [ActorsController],
  providers: [ActorsService],
  imports: [SequelizeModule.forFeature([Persons, Actors]),
    JwtModule,
    CacheModule.register()
  ],
  exports: [
      ActorsService,
  ]
})
export class ActorsModule {}
