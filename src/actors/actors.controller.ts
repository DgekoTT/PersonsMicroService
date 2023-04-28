import {Controller, Get, Inject, Param, Post} from '@nestjs/common';
import {ActorsService} from "./actors.service";
import {Actors} from "./actors.model";

@Controller('actors')
export class ActorsController {
    constructor(private actorsService: ActorsService) {
    }

    @Post('/load')
    loadActors(): Promise<string>{
        return this.actorsService.loadActors();
    }

    @Get('/:id')
    getActorByPersonId(@Param('id')id : number): Promise<Actors> {
        return this.actorsService.getActorByPersonId(+id);
    }

}
