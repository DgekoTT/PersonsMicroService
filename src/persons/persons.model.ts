import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

interface PersonsCreationAttrs {
    filmId: number,
    director: string,
    scenario: string,
    producer: string,
    operator: string,
    composer: string,
    painter: string,
    installation: string,
    actors: string[]
}

@Table({tableName: 'persons'})
export class Persons extends Model<Persons, PersonsCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '1', description: 'id фильма к которому относятся весь список участников'})
    @Column({type: DataType.INTEGER})
    filmId: number;

    @ApiProperty({example: 'Мэтт Дэннер', description: 'режиссер'})
    @Column({type: DataType.STRING})
    director: string;

    @ApiProperty({example: 'Патрик Кейси, Джош Миллер', description: 'сценаристы'})
    @Column({type: DataType.STRING})
    scenario: string;

    @ApiProperty({example: 'Маргарет М. Дин, Кимберли А. Смит', description: 'продюссеры'})
    @Column({type: DataType.STRING})
    producer: string;

    @ApiProperty({example: 'Бекки Нюбул,', description: 'операторы'})
    @Column({type: DataType.STRING})
    operator: string;

    @ApiProperty({example: 'Бекки Нюбул, Linus of Hollywood, Гэбриел Манн', description: 'композиторы'})
    @Column({type: DataType.STRING})
    composer: string;

    @ApiProperty({example: 'Эфраим Клейн', description: 'художники'})
    @Column({type: DataType.STRING})
    painter: string;

    @ApiProperty({example: 'Эфраим Клейн', description: 'инсталяторы'})
    @Column({type: DataType.STRING})
    installation: string;

    @ApiProperty({example: ["Дэвид Лодж",
            "Николас Ройе",
            "Джессика Ги",
            "Бен Дискин",
            "Грант Джордж",
            "Фарук Тохид"], description: 'в главных ролях по ключу можно найти в бд актеров'})
    @Column({type: DataType.ARRAY(DataType.STRING)})
    actors: string[];
}