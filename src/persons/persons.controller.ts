import {Body, Controller, Get, Inject} from '@nestjs/common';
import {PersonsService} from "./persons.service";
import {ClientProxy, MessagePattern} from "@nestjs/microservices";
import {Persons} from "./persons.model";
import {Helper} from "../helper/makeFilmAndPersons";
import { log } from 'console';

@Controller('persons')
export class PersonsController {
    constructor(private personsService: PersonsService,
                //@Inject("PERSON_SERVICE") private readonly client: ClientProxy,
                ) {}

    @MessagePattern({cmd: 'createPersons'})
    createPersons(@Body() dto: string): Promise<Persons>{
        let personsDto = JSON.parse(dto)
        return this.personsService.createPersons(personsDto);
    }

    @MessagePattern({cmd: "getPersons"})
    getPersons(id: string): Promise<{}>{
        return this.personsService.getPersonsByFilmId(+id);
    }

    @MessagePattern({cmd: "Find film id by actor or director"})
    findFilmIdByActorOrDirector(@Body() dto: string){
        const {director, actor} = JSON.parse(dto)
        return this.personsService.findFilmIdByActorOrDirector(director, actor);
    }

}
