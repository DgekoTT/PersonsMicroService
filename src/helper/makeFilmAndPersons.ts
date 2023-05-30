
export class Helper {
     makePersonsInfo(persons) {
        let actors = persons.actors ? persons.actors.map(el => el.name) : null
        return {
            filmId: persons.filmId,
            director: persons?.director,
            scenario: persons?.scenario,
            producer: persons?.producer,
            operator: persons?.operator,
            composer: persons?.composer,
            painter: persons?.painter,
            installation: persons?.installation,
            actors: actors,
        }
    }
}