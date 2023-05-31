export interface ActorsCreationAttrs {
    id?: number;
    personId: number;
    name: string;
    nameEn: string;
    sex: string;
    posterUrl: string;
    growth: number;
    birthday: string;
    death: string;
    age: number;
    birthplace: string;
    deathplace: string;
    profession: string;
    facts: string[];
    films: Film[];
}

export type Film = {
    filmSpId: number;
    name: string;
};
