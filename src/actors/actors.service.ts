import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Actors} from "./actors.model";
import * as fs from "fs";
import {CreateActorDto} from "./dto/create-actor.dto";



@Injectable()
export class ActorsService {
    constructor(@InjectModel(Actors) private actorsRepository: typeof Actors) {
    }
    loadActors(): string {
        for (let i=0; i < 1; i++) {
            try{
                let data = fs.readFileSync('G://AA//person-microservice//src//actors//actorsData//actors0.json', 'utf8')
                let info = JSON.parse(data);
                let names = [];
                for( let el of info){
                    let actor = this.makeDataActor(el);
                    if(!names.includes(actor.name)){
                        names.push(actor.name)
                        console.log(actor)
                    }
                }
            }catch (e) {
                console.log(e);
            }
        }
        return `successes`;
    }

    private makeDataActor(el: any): CreateActorDto {
        let films = this.findFilms(el.films);
        let data = {
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
          return data;

    }

    private findFilms(films): string {
        let allFilms = '';
        for (let name of films){
            allFilms += (name.nameRu || name.nameEn)+ '; ';
        }
        return allFilms;
    }
}
