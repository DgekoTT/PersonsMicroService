export interface PersonsCreationAttrs {
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

export interface DirectorInfo {
    director: string,
    filmId: number
}

export interface PersonsInfo {
    director: string,
    scenario: string,
    producer: string,
    operator: string,
    composer: string,
    painter: string,
    installation: string,
    actors: string[],
}