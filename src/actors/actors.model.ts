import {Column, DataType, Model, Table} from "sequelize-typescript";


interface ActorsCreationAttrs {
    id?: number;
    personId: number;
    name: string;
    nameEn: string;
    sex: string;
    posterUrl: string;
    growth: string;
    birthday: string;
    death: string;
    age: string;
    birthplace: string;
    deathplace: string;
    profession: string;
    facts: string[];
    films: Film[];

}

type Film = {
    filmSpId: number;
    name: string;
};

@Table({tableName: 'actors'})
export class Actors extends Model<Actors, ActorsCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.INTEGER})
    personId: number;
    @Column({type: DataType.STRING})
    name: string;
    @Column({type: DataType.STRING})
    nameEn: string;
    @Column({type: DataType.STRING})
    sex: string;
    @Column({type: DataType.TEXT})
    posterUrl: string;
    @Column({type: DataType.STRING})
    growth: string;
    @Column({type: DataType.STRING})
    birthday: string;
    @Column({type: DataType.STRING})
    death: string;
    @Column({type: DataType.STRING})
    age: string;
    @Column({type: DataType.STRING})
    birthplace: string;
    @Column({type: DataType.STRING})
    deathplace: string;
    @Column({type: DataType.STRING})
    profession: string;
    @Column({type: DataType.ARRAY(DataType.TEXT)})
    facts: string[];
    @Column({type: DataType.JSONB})
    films: Film[];
}