
export class Helper {
     makePersonsInfo(persons) {
        let actors = persons.actors ? Object.values(persons.actors) : null
        return {
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