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

    async getPersonsByFilmId(number: number): Promise<Persons> {
        const persons = await  this.personsRepository.findOne({where: {filmId: number}});
        return persons;
    }
}
