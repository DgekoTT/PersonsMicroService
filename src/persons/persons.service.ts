import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import {Persons} from "./persons.model";
import {InjectModel} from "@nestjs/sequelize";


@Injectable()
export class PersonsService {
    constructor(@InjectModel(Persons) private personsRepository: typeof Persons) {}

    async createPersons(dto: CreatePersonDto): Promise<Persons> {
        const newPersons = await this.personsRepository.create(dto)
        return newPersons;
    }

    async getPersonsByFilmId(number: number): Promise<{}> {
        const persons = await  this.personsRepository.findOne({where: {filmId: number}});
        const personsInfo = this.makePersonsInfo(persons);
        return personsInfo;
    }

    makePersonsInfo(persons: Persons) {
        const personsInfo = {
        director: persons.director,
        scenario: persons.scenario,
        producer: persons.producer,
        operator: persons.operator,
        composer: persons.composer,
        painter: persons.painter,
        installation: persons.installation,
        actors: persons.actors,
        }
        return personsInfo;
    }
}