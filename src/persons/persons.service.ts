import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import {Persons} from "./persons.model";
import {InjectModel} from "@nestjs/sequelize";
import {Op} from "sequelize";


@Injectable()
export class PersonsService {
    constructor(@InjectModel(Persons) private personsRepository: typeof Persons) {}

    async createPersons(dto: CreatePersonDto): Promise<Persons> {
        return await this.personsRepository.create(dto)
    }

    async getPersonsByFilmId(number: number): Promise<{}> {
        console.log(number)
        const persons = await  this.personsRepository.findOne({where: {filmId: number}});
        console.log(persons)
        return  this.makePersonsInfo(persons);
    }

    makePersonsInfo(persons: Persons) {
      return  {
        director: persons?.director,
        scenario: persons?.scenario,
        producer: persons?.producer,
        operator: persons?.operator,
        composer: persons?.composer,
        painter: persons?.painter,
        installation: persons?.installation,
        actors: persons?.actors,
        }
    }

   async findFilmIdByActorOrDirector(directorName: any, actorName: any){
        let whereCondition: any = {};
    
        if (directorName) {
            whereCondition.director = {[Op.like]: `%${directorName.trim()}%`};
        }
    
        if (actorName) {
            whereCondition.actors = {
                [Op.contains]: [`${actorName.trim()}`]
            };
        }
       const persons = await this.personsRepository.findAll({ where: whereCondition });
       return persons.map(el => el.filmId);
   }
}