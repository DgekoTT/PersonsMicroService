import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import {Persons} from "./persons.model";
import {InjectModel} from "@nestjs/sequelize";
import sequelize, {Op} from "sequelize";


@Injectable()
export class PersonsService {
    constructor(@InjectModel(Persons) private personsRepository: typeof Persons) {}

    async createPersons(dto: CreatePersonDto): Promise<Persons> {
        return await this.personsRepository.create(dto)
    }

    async getPersonsByFilmId(number: number): Promise<{}> {
        const persons = await  this.personsRepository.findOne({where: {filmId: number}});
        return  this.makePersonsInfo(persons);
    }

    makePersonsInfo(persons: Persons) {
      return  {
        director: persons.director,
        scenario: persons.scenario,
        producer: persons.producer,
        operator: persons.operator,
        composer: persons.composer,
        painter: persons.painter,
        installation: persons.installation,
        actors: persons.actors,
        }
    }

   async findFilmIdByActorOrDirector(directorName: any, actorName: any): Promise<number[]> {
       const whereCondition: any = {};

       if (directorName) {
           whereCondition.director = directorName.trim();
       }

       if (actorName) {
           whereCondition.actors = {
               [Op.contains]: { [Op.ne]: null, [actorName]: { [Op.ne]: null } },
           };
       }

       const persons = await Persons.findAll({ where: whereCondition });
       return persons.map(el => el.filmId);
   }
}