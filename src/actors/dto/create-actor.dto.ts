import { IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateActorDto{
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @IsOptional()
    readonly id?: number;

    @ApiProperty({example: 114225, description: 'id ключ из списка актеров из бд персон'})
    readonly personId: number;

    @ApiProperty({example: 'Ник Стил', description: 'имя актера на русском'})
    @IsString({message: " Должно быть строкой"})
    readonly name: string;

    @ApiProperty({example: 'Nick Steel', description: 'имя актера на английмком'})
    @IsString({message: " Должно быть строкой"})
    readonly nameEn: string;

    @ApiProperty({example: 'MALE', description: 'пол актера на английмком'})
    @IsString({message: " Должно быть строкой"})
    readonly sex: string;

    @ApiProperty({example: '"https://kinopoiskapiunofficial.tech/images/actor_posters/kp/1245312.jpg"', description: 'фото актера'})
    @IsString({message: " Должно быть строкой"})
    readonly posterUrl: string;

    @ApiProperty({example: 178, description: 'рост актера'})
    @IsString({message: " Должно быть строкой"})
    readonly growth: number;


    @ApiProperty({example: "1980-07-28", description: 'день рождения актера'})
    @IsString({message: " Должно быть строкой"})
    readonly birthday: string;

    @ApiProperty({example: null, description: 'дата смерти актера'})
    @IsString({message: " Должно быть строкой"})
    readonly death: string;

    @ApiProperty({example: 41, description: 'возвраст актера'})
    readonly age: number;

    @ApiProperty({example: "США", description: 'место рождения актера'})
    @IsString({message: " Должно быть строкой"})
    readonly birthplace: string;

    @ApiProperty({example: null, description: 'место смерти актера'})
    @IsString({message: " Должно быть строкой"})
    readonly deathplace: string;

    @ApiProperty({example: "Актер, Режиссер, Сценарист", description: 'профессии актера'})
    @IsString({message: " Должно быть строкой"})
    readonly profession: string;

    @ApiProperty({example: ["был в арктике", 'прыгал с парашютом с 5000м'], description: 'интересные факты о актера'})
    readonly facts: string[];

    @ApiProperty({example: [
            {
                "filmId": 18361,
                "nameRu": "Новичкам везет",
                "nameEn": "Beginner's Luck",
                "rating": null,
                "general": false,
                "description": "Jean-Yves",
                "professionKey": "ACTOR"
            },
            {
                "filmId": 498313,
                "nameRu": "Французские связи",
                "nameEn": "Paris Connections",
                "rating": "5.5",
                "general": false,
                "description": "William Brown",
                "professionKey": "ACTOR"
            },], description: 'список фильмов актера,  "filmId": 498313 это filmSpId в бд фильмов'})
    readonly films: any[];
}