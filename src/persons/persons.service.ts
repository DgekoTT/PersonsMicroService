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

        const persons = await  this.personsRepository.findOne({where: {filmId: number}});

        if (!persons) {
            return { message: `Персоны с данным personId ${number} не найдены` };
        }
        return  this.makePersonsInfo(persons);
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

        const persons = await this.personsRepository.findAll({ where: whereCondition });

        return persons.map(el => el.filmId);
    }

   async getDirectorByName(nameDto: NameDirectorDto): Promise<DirectorInfo[]> {
        let name = decodeURI(nameDto.name);
    
        const cacheKey = `getDirectorByName:${name}`;
        const cachedDirectorInfo = await this.cacheManager.get<DirectorInfo[]>(cacheKey);
    
        if (cachedDirectorInfo) return cachedDirectorInfo;
        
    
        const persons: Persons[] = await this.personsRepository.findAll({
        where: { director: { [Op.like]: `%${name}%` } },
        limit: 10,
        });
    
        const directorInfo = persons.map(el => ({
            director: el.director,
            filmId: el.filmId,
        }));
    
        await this.cacheManager.set(cacheKey, directorInfo);
    
        return directorInfo;
    }

    private checkProfession(directorName: any, actorName: any) {
        let whereCondition: any = {}
        if (directorName) {
            whereCondition.director = {[Op.iLike]: `%${directorName.trim()}%`};
        }

        if (actorName) {
            whereCondition.actors = {
                [Op.contains]: [`${actorName.trim()}`]
            };
        }
        return whereCondition
    }
}
