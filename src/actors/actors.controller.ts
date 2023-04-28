import {Controller, Inject, Post} from '@nestjs/common';
import {ActorsService} from "./actors.service";

@Controller('actors')
export class ActorsController {
    constructor(private actorsService: ActorsService) {
    }

    @Post('/loadActors')
    loadActors(): Promise<string>{
        return this.actorsService.loadActors();
    }
}
