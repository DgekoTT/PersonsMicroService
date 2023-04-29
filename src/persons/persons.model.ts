import {Column, DataType, Model, Table} from "sequelize-typescript";

interface PersonsCreationAttrs {
    filmId: number,
    director: string,
    scenario: string,
    producer: string,
    operator: string,
    composer: string,
    painter: string,
    installation: string,
    actors: {}
}

@Table({tableName: 'persons'})
export class Persons extends Model<Persons, PersonsCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.INTEGER})
    filmId: number;
    @Column({type: DataType.STRING})
    director: string;
    @Column({type: DataType.STRING})
    scenario: string;
    @Column({type: DataType.STRING})
    producer: string;
    @Column({type: DataType.STRING})
    operator: string;
    @Column({type: DataType.STRING})
    composer: string;
    @Column({type: DataType.STRING})
    painter: string;
    @Column({type: DataType.STRING})
    installation: string;
    @Column({type: DataType.JSONB})
    actors: {};
}