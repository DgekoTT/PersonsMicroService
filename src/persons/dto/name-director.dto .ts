import { IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class NameDirectorDto{


    @ApiProperty({example: 'Адам Вуд', description: 'имя режиссера или его часть на русском'})
    @IsString({message: " Должно быть строкой"})
    readonly name: string;

}