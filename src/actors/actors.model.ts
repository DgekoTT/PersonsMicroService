import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {ActorsCreationAttrs, Film} from "../inretfaces/actors.interfaces";



@Table({tableName: 'actors'})
export class Actors extends Model<Actors, ActorsCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 114225, description: 'id ключ из списка актеров из бд персон'})
    @Column({type: DataType.INTEGER})
    personId: number;

    @ApiProperty({example: 'Ник Стил', description: 'имя актера на русском'})
    @Column({type: DataType.STRING})
    name: string;

    @ApiProperty({example: 'Nick Steel', description: 'имя актера на английмком'})
    @Column({type: DataType.STRING})
    nameEn: string;

    @ApiProperty({example: 'MALE', description: 'пол актера на английмком'})
    @Column({type: DataType.STRING})
    sex: string;

    @ApiProperty({example: '"https://kinopoiskapiunofficial.tech/images/actor_posters/kp/1245312.jpg"', description: 'фото актера'})
    @Column({type: DataType.TEXT})
    posterUrl: string;

    @ApiProperty({example: 178, description: 'рост актера'})
    @Column({type: DataType.INTEGER})
    growth: number;

    @ApiProperty({example: "1980-07-28", description: 'день рождения актера'})
    @Column({type: DataType.STRING})
    birthday: string;

    @ApiProperty({example: null, description: 'дата смерти актера'})
    @Column({type: DataType.STRING})
    death: string;

    @ApiProperty({example: 41, description: 'возвраст актера'})
    @Column({type: DataType.INTEGER})
    age: number;

    @ApiProperty({example: "США", description: 'место рождения актера'})
    @Column({type: DataType.STRING})
    birthplace: string;

    @ApiProperty({example: null, description: 'место смерти актера'})
    @Column({type: DataType.STRING})
    deathplace: string;

    @ApiProperty({example: "Актер, Режиссер, Сценарист", description: 'профессии актера'})
    @Column({type: DataType.STRING})
    profession: string;

    @ApiProperty({example: ["был в арктике", 'прыгал с парашютом с 5000м'], description: 'интересные факты о актера'})
    @Column({type: DataType.ARRAY(DataType.TEXT)})
    facts: string[];

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
    @Column({type: DataType.JSONB})
    films: Film[];
}