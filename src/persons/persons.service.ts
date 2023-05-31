import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import {Persons} from "./persons.model";
import {InjectModel} from "@nestjs/sequelize";
import {Op} from "sequelize";
import { NameDirectorDto } from './dto/name-director.dto ';


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

   async getDirectorByName(nameDto: NameDirectorDto) {
    let name = decodeURI(nameDto.name)
    console.log(name)
    const persons: Persons[] = await this.personsRepository.findAll({ 
        where: {director: {[Op.like]: `%${name}%`}},
        limit: 10,
    })
    return persons.map(el => {
        return { director: el.director, filmId: el.filmId };
      });
}
}
