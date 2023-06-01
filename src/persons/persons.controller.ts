import {Body, Controller, Get, Inject, Query} from '@nestjs/common';
import {PersonsService} from "./persons.service";
import {ClientProxy, MessagePattern} from "@nestjs/microservices";
import {Persons} from "./persons.model";
import {Helper} from "../helper/makeFilmAndPersons";
import { log } from 'console';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NameDirectorDto } from './dto/name-director.dto ';
import {DirectorInfo, PersonsInfo} from "../inretfaces/persons.interfaces";
import { CacheTTL } from '@nestjs/cache-manager';

@Controller('persons')
export class PersonsController {
    constructor(private personsService: PersonsService,
                @Inject("PERSON_SERVICE") private readonly client: ClientProxy,) {}

    @MessagePattern({cmd: 'createPersons'})
    createPersons(@Body() dto: string): Promise<Persons>{
        let personsDto = JSON.parse(dto)
        return this.personsService.createPersons(personsDto);
    }

    @MessagePattern({cmd: "getPersons"})
    getPersons(id: string) : Promise<PersonsInfo | {message: string}> {
        return this.personsService.getPersonsByFilmId(+id);
    }

    @MessagePattern({cmd: "Find film id by actor or director"})
    findFilmIdByActorOrDirector(@Body() dto: string) : Promise<number[]>{
        const {director, actor} = JSON.parse(dto)
        return this.personsService.findFilmIdByActorOrDirector(director, actor);
    }

    @ApiOperation({summary: 'получаем режиссеров по буквам в имени'})
    @ApiResponse({status: 200, description: 'Успешный запрос', type: String, isArray: false})
    @Get('/name')
    @CacheTTL(60)
    getDirectorByName(@Query() nameDto : NameDirectorDto) : Promise<DirectorInfo[]>   {
        return this.personsService.getDirectorByName(nameDto);
    }

}
