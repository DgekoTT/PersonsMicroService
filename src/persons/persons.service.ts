import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import {Persons} from "./persons.model";
import {InjectModel} from "@nestjs/sequelize";


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
}