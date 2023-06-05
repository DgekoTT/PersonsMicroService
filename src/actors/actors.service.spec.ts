import { Test } from '@nestjs/testing';
import { Cache } from 'cache-manager';
import { ActorsService } from './actors.service';
import {Op} from "sequelize";
import {NameActorDto} from "./dto/name-actor.dto ";

describe('ActorsService', () => {
  let actorsService: ActorsService;
  let actorsRepository: any;
  let cacheManager: Cache;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ActorsService,
        {
          provide: 'ActorsRepository',
          useValue: {
            findOne: jest.fn(),
            findAll: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: 'CACHE_MANAGER',
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    actorsService = moduleRef.get<ActorsService>(ActorsService);
    actorsRepository = moduleRef.get('ActorsRepository');
    cacheManager = moduleRef.get('CACHE_MANAGER');
  });



  describe('getActorByPersonId', () => {
    it('should return cached actor if available', async () => {
      const cachedActor = { id: 1, name: 'John Doe' };
      jest.spyOn(cacheManager, 'get').mockResolvedValue(cachedActor);

      const result = await actorsService.getActorByPersonId(1);

      expect(cacheManager.get).toHaveBeenCalledWith('1');
      expect(actorsRepository.findOne).not.toHaveBeenCalled();
      expect(result).toBe(cachedActor);
    });

    it('should return actor by personId', async () => {
      const actor = { id: 1, name: 'John Doe' };
      jest.spyOn(cacheManager, 'get').mockResolvedValue(null);
      jest.spyOn(actorsRepository, 'findOne').mockResolvedValue(actor);
      jest.spyOn(cacheManager, 'set').mockResolvedValue(null);

      const result = await actorsService.getActorByPersonId(1);

      expect(cacheManager.get).toHaveBeenCalledWith('1');
      expect(actorsRepository.findOne).toHaveBeenCalledWith({ where: { personId: 1 } });
      expect(cacheManager.set).toHaveBeenCalledWith('1', actor);
      expect(result).toBe(actor);
    });

    it('should return error message if actor not found', async () => {
      jest.spyOn(cacheManager, 'get').mockResolvedValue(null);
      jest.spyOn(actorsRepository, 'findOne').mockResolvedValue(null);

      const result = await actorsService.getActorByPersonId(1);

      expect(cacheManager.get).toHaveBeenCalledWith('1');
      expect(actorsRepository.findOne).toHaveBeenCalledWith({ where: { personId: 1 } });
      expect(result).toEqual({ message: 'Актер с данным personId 1 не найден' });
    });
  });

  describe('getActorsByName', () => {
    it('should return cached actors if available', async () => {
      const nameDto: NameActorDto = { name: 'John', nameEn: null };
      const cacheKey = `getActorsByName:${JSON.stringify(nameDto)}`;
      const cachedActors = [{ id: 1, name: 'John Doe' }];
      jest.spyOn(cacheManager, 'get').mockResolvedValue(cachedActors);

      const result = await actorsService.getActorsByName(nameDto);

      expect(cacheManager.get).toHaveBeenCalledWith(cacheKey);
      expect(actorsRepository.findAll).not.toHaveBeenCalled();
      expect(result).toBe(cachedActors);
    });

    it('should return actors by name', async () => {
      const nameDto: NameActorDto = { name: 'John', nameEn: null };
      const cacheKey = `getActorsByName:${JSON.stringify(nameDto)}`;
      const actors = [{ id: 1, name: 'John Doe' }];
      jest.spyOn(cacheManager, 'get').mockResolvedValue(null);
      jest.spyOn(actorsRepository, 'findAll').mockResolvedValue(actors);
      jest.spyOn(cacheManager, 'set').mockResolvedValue(null);

      const result = await actorsService.getActorsByName(nameDto);

      expect(cacheManager.get).toHaveBeenCalledWith(cacheKey);
      expect(actorsRepository.findAll).toHaveBeenCalledWith({
        where: { name: { [Op.iLike]: '%John%' } },
        limit: 10,
      });
      expect(cacheManager.set).toHaveBeenCalledWith(cacheKey, actors);
      expect(result).toBe(actors);
    });
  });

});
