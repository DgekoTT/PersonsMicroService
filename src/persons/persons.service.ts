import {Inject, Injectable} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import {Persons} from "./persons.model";
import {InjectModel} from "@nestjs/sequelize";
import {Op} from "sequelize";
import { NameDirectorDto } from './dto/name-director.dto ';
import {DirectorInfo, PersonsInfo} from "../inretfaces/persons.interfaces";
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';



@Injectable()
export class PersonsService {
    constructor(@InjectModel(Persons) private personsRepository: typeof Persons,
                @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async createPersons(dto: CreatePersonDto): Promise<Persons> {
        return await this.personsRepository.create(dto)
    }

    async getPersonsByFilmId(number: number) : Promise<PersonsInfo | {message: string}> {
        const cachePersons = await this.cacheManager.get<Persons>(number.toString())

        if (cachePersons) return cachePersons;

        const persons = await  this.personsRepository.findOne({where: {filmId: number}});
        if (!persons) {
            return { message: `Актер с данным personId ${number} не найден` };
        }
        const personsInfo =  this.makePersonsInfo(persons);
        await this.cacheManager.set(number.toString(), personsInfo);
        return personsInfo
    }

    makePersonsInfo(persons: Persons) : PersonsInfo {
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

   async findFilmIdByActorOrDirector(directorName: any, actorName: any) : Promise<number[]>{
        let whereCondition: any = this.checkProfession( directorName, actorName)

       const cacheKey = `getFilmIdsByDirectorAndActor:${JSON.stringify(whereCondition)}`;
       const cachedFilmIds = await this.cacheManager.get<number[]>(cacheKey);

       if (cachedFilmIds) {
           return cachedFilmIds;
       }

       const persons = await this.personsRepository.findAll({ where: whereCondition });
       const filmIds = persons.map(el => el.filmId);

       await this.cacheManager.set(cacheKey, filmIds);

       return filmIds;
   }

   async getDirectorByName(nameDto: NameDirectorDto) : Promise<DirectorInfo[]> {
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

    private checkProfession(directorName: any, actorName: any) {
        let whereCondition: any = {}
        if (directorName) {
            whereCondition.director = {[Op.like]: `%${directorName.trim()}%`};
        }

        if (actorName) {
            whereCondition.actors = {
                [Op.contains]: [`${actorName.trim()}`]
            };
        }
        return whereCondition
    }
}
