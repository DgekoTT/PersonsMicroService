import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Actors} from "./actors.model";
import * as fs from "fs";
import {CreateActorDto} from "./dto/create-actor.dto";
import {Op} from "sequelize";
import { NameActorDto } from './dto/name-actor.dto ';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';




@Injectable()
export class ActorsService {
    private professionKey: number;
    constructor(@InjectModel(Actors) private actorsRepository: typeof Actors,
                @Inject(CACHE_MANAGER) private cacheManager: Cache) {
    }

    async loadActors(): Promise<string> {
        for (let i=0; i < 21; i++) {// Проходим по всем файлам в папке
            try{
                let data = fs.readFileSync(`./src/actors/actorsData/actors${i}.json`, 'utf8')
                let info = JSON.parse(data);
                await this.loadToBase(info);
            }catch (e) {
                console.log(e);
                throw new HttpException('load error', HttpStatus.BAD_REQUEST)
            }
        }
        return `successes`;
    }

    private makeDataActor(el: any): CreateActorDto {
        let films = this.findFilms(el.films);
        return  {
            personId: el.personId,
            name: el.nameRu,
            nameEn: el.nameEn,
            sex: el.sex,
            posterUrl: el.posterUrl,
            growth: el.growth,
            birthday: el.birthday,
            death: el.death,
            age: el.age,
            birthplace: el.birthplace,
            deathplace: el.deathplace,
            profession: el.profession,
            facts: el.facts,
            films: films
        }
    }

    private findFilms(films): any[] {
        let allFilms = [];
        let filmData = []; //для проверки дубликатов
        for (let name of films){
            if(!filmData.includes(name.nameRu || name.nameEn)) {
                filmData.push(name.nameRu || name.nameEn);
                allFilms.push({
                    filmId: name.filmId,
                    name: (name.nameRu || name.nameEn),
                    professionKey: name.professionKey
                })
            }
        }
        return allFilms;
    }

    private async loadToBase(info: any) : Promise<void> {
        let names = [];//для проверки дубликатов
        for (let el of info) {
            let actor = this.makeDataActor(el);
            if (!names.includes(actor.name)) {
                names.push(actor.name);
                await this.actorsRepository.create(actor);
            }
        }
    }

    async getActorByPersonId(id: number) : Promise<Actors | {message: string} > {
        const cachedActor = await this.cacheManager.get<Actors>(id.toString());

        if (cachedActor) return cachedActor;


        const actor = await this.actorsRepository.findOne({ where: { personId: id } });

        if (!actor) {
            return { message: `Актер с данным personId ${id} не найден` };
        }

        await this.cacheManager.set(id.toString(), actor);

        return actor;
    }

    async getActorsByName(name: NameActorDto) : Promise<Actors[]> {
        const cacheKey = `getActorsByName:${JSON.stringify(name)}`;
        const cachedActors = await this.cacheManager.get<Actors[]>(cacheKey);

        if (cachedActors) {
            return cachedActors;
        }

        const whereOption = this.makeWhereOption(name)

        const actors = await this.actorsRepository.findAll({
            where: whereOption,
            limit: 10,
        });

        await this.cacheManager.set(cacheKey, actors);

        return actors;
    }

    private makeWhereOption(name: NameActorDto) {
        if (name.nameEn) {
            return { name: { [Op.like]: `%${name.nameEn}%` } }
        } else {
            return { name: { [Op.like]: `%${decodeURI(name.name)}%`}}
        }

    }
}
