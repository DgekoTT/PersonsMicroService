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
    createPersons(@Body() dto: string): Promise<Persons>{
        const personsDto = JSON.parse(dto)
        console.log(personsDto)
        return this.personsService.createPersons(personsDto);
    }

    @MessagePattern({cmd: "getPersons"})
    getPersons(id: string): Promise<Persons>{
        return this.personsService.getPersonsByFilmId(+id);
    }

}
