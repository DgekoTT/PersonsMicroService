import {Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ActorsService} from "./actors.service";
import {Actors} from "./actors.model";
import {Roles} from "../Guards/roles-auth.decorator";
import {RolesGuard} from "../Guards/role.guard";
import {ApiCookieAuth, ApiOperation, ApiResponse} from "@nestjs/swagger";

@Controller('actors')
export class ActorsController {
    constructor(private actorsService: ActorsService) {
    }
    @ApiCookieAuth()
    @ApiOperation({summary: 'загружаем актеров в бд '})
    @ApiResponse({status: 200, description: 'Успешный запрос', type: String, isArray: false})
    @Roles("admin")
    @UseGuards(RolesGuard) // проверка на роли, получить доступ сможет только админ
    @Post('/load')
    loadActors(): Promise<string>{
        return this.actorsService.loadActors();
    }

    @ApiOperation({summary: 'получаем актера по person id'})
    @ApiResponse({status: 200, description: 'Успешный запрос', type: String, isArray: false})
    @Get('/:id')
    getActorByPersonId(@Param('id')id : number): Promise<Actors | string>  {
        return this.actorsService.getActorByPersonId(+id);
    }

    // @ApiOperation({summary: 'получаем актера по person id'})
    // @ApiResponse({status: 200, description: 'Успешный запрос', type: String, isArray: false})
    // @Get('/:id')
    // getActorByPersonId(@Param('id')id : number): Promise<Actors | string>  {
    //     return this.actorsService.getActorByPersonId(+id);
    // }

}
