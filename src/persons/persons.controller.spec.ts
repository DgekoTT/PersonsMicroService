import { Test, TestingModule } from '@nestjs/testing';
import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';

describe('PersonsController', () => {
  let personsController: PersonsController;
  let spyService: PersonsService;

  const mockPersonsService = {
      createPersons: jest.fn((dto) => {
        return {
          filmId: dto.filmId,
          director: dto.director,
          scenario: dto.scenario,
          producer: dto.producer,
          operator: dto.operator,
          composer: dto.composer,
          painter: dto.painter,
          installation: dto.installation,
          actors: dto.actors
          }
         }
      )
  }


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonsController],
      providers: [
        PersonsService,
        
      ]
    })
    .overrideProvider(PersonsService)
    .useValue(mockPersonsService)
    .compile();

    personsController = module.get<PersonsController>(PersonsController);
    spyService = module.get<PersonsService>(PersonsService);
  });

  it('should be defined', () => {
    expect(personsController).toBeDefined();
  });

  it('should be called createPerson', () => {
    const dto = {
      filmId: 123,
      director: "Дэвид Лодж",
      scenario: "Николас Ройе",
      producer: "Джессика Ги",
      operator: "Бен Дискин",
      composer: "Грант Джордж",
      painter: "Фарук Тохид",
      installation: "Фарук Тохид",
      actors: ["Дэвид Лодж",
              "Николас Ройе",
              "Джессика Ги",
              "Бен Дискин",
              "Грант Джордж",
              "Фарук Тохид"]
    }
    const dtoJson = JSON.stringify(dto);
    personsController.createPersons(dtoJson);
    expect(spyService.createPersons(dto)).toEqual({
              filmId: 123,
              director: "Дэвид Лодж",
              scenario: "Николас Ройе",
              producer: "Джессика Ги",
              operator: "Бен Дискин",
              composer: "Грант Джордж",
              painter: "Фарук Тохид",
              installation: "Фарук Тохид",
              actors: ["Дэвид Лодж",
                      "Николас Ройе",
                      "Джессика Ги",
                      "Бен Дискин",
                      "Грант Джордж",
                      "Фарук Тохид"]
            })
  });
});
