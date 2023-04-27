import {Body, Controller, Inject} from '@nestjs/common';
import {PersonsService} from "./persons.service";
import {ClientProxy, MessagePattern} from "@nestjs/microservices";
import {CreatePersonDto} from "./dto/create-person.dto";
import {Persons} from "./persons.model";

@Controller('persons')
export class PersonsController {
    constructor(private personsService: PersonsService,
                @Inject("PERSON_SERVICE") private readonly client: ClientProxy) {}

    @MessagePattern({cmd: 'createPersons'})
    createPersons(@Body() dto: CreatePersonDto): Promise<Persons>{
        return this.personsService.createPersons(dto)

    }
}
