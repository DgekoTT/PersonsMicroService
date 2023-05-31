import { IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class NameActorDto{


    @ApiProperty({example: 'Ник Стил', description: 'имя актера на русском'})
    @IsString({message: " Должно быть строкой"})
    @IsOptional()
    readonly name?: string;

    @ApiProperty({example: 'Nick Steel', description: 'имя актера на английмком'})
    @IsString({message: " Должно быть строкой"})
    @IsOptional()
    readonly nameEn?: string;

}