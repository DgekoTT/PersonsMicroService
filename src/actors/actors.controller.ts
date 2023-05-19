import {Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ActorsService} from "./actors.service";
import {Actors} from "./actors.model";
import {Roles} from "../Guards/roles-auth.decorator";
import {RolesGuard} from "../Guards/role.guard";

@Controller('actors')
export class ActorsController {
    constructor(private actorsService: ActorsService) {
    }

    @Roles("admin")
    @UseGuards(RolesGuard) // проверка на роли, получить доступ сможет только админ
    @Get('/ga')
    mu(){
        return "this.actorsService.loadActors()";
    }

    @Roles("admin")
    @UseGuards(RolesGuard) // проверка на роли, получить доступ сможет только админ
    @Post('/load')
    loadActors(): Promise<string>{
        return this.actorsService.loadActors();
    }

    @Get('/:id')
    getActorByPersonId(@Param('id')id : number): Promise<Actors> {
        return this.actorsService.getActorByPersonId(+id);
    }

}
