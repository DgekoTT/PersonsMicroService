import { Test, TestingModule } from '@nestjs/testing';
import { ActorsController } from './actors.controller';
import { ActorsService } from './actors.service';
import { JwtService } from '@nestjs/jwt';

describe('ActorsController', () => {
  let actorsController: ActorsController;
  let spyService: ActorsService;

  const mockActorsService = {
    getActorByPersonId: jest.fn(() => {
        return  {
          personId: 999,
          name: "Иван",
          nameEn: "Ivan",
          sex: "Male",
          posterUrl: "none",
          growth: "growth",
          birthday: "09-09-1999",
          death: "none",
          age: "23",
          birthplace: "birthplace",
          deathplace: "deathplace",
          profession: "profession",
          facts: "facts"
      }
      })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActorsController],
      providers: [
        ActorsService,
        JwtService
      ]
    }).overrideProvider(ActorsService)
    .useValue(mockActorsService)
    .compile();

    actorsController = module.get<ActorsController>(ActorsController);
    spyService = module.get<ActorsService>(ActorsService);
  });

  it('should be defined', () => {
    expect(actorsController).toBeDefined();
  });

  it('should be call loadActors', () => {
    actorsController.getActorByPersonId(999)
    expect(actorsController.getActorByPersonId(999)).toEqual(
      {
        personId: 999,
        name: "Иван",
        nameEn: "Ivan",
        sex: "Male",
        posterUrl: "none",
        growth: "growth",
        birthday: "09-09-1999",
        death: "none",
        age: "23",
        birthplace: "birthplace",
        deathplace: "deathplace",
        profession: "profession",
        facts: "facts"
    }
    );
  });
});
