import { Test } from '@nestjs/testing';
import { PersonsService } from './persons.service';
import {Op} from "sequelize";

describe('PersonsService', () => {
  let personsService: PersonsService;
  let personsRepository: any;
  let cacheManager: any;
  const createPersonDto = {
    filmId: 1,
    director: 'Мэтт Дэннер',
    scenario: 'Патрик Кейси, Джош Миллер',
    producer: 'Маргарет М. Дин, Кимберли А. Смит',
    operator: 'Бекки Нюбул',
    composer: 'Бекки Нюбул, Linus of Hollywood, Гэбриел Манн',
    painter: 'Эфраим Клейн',
    installation: 'Эфраим Клейн',
    actors: ["Дэвид Лодж",
      "Николас Ройе",
      "Джессика Ги",
      "Бен Дискин",
      "Грант Джордж",
      "Фарук Тохид"]
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PersonsService,
        {
          provide: 'PersonsRepository',
          useValue: {},
        },
        {
          provide: 'CACHE_MANAGER',
          useValue: {},
        },
      ],
    }).compile();

    personsService = moduleRef.get<PersonsService>(PersonsService);
    personsRepository = moduleRef.get<any>('PersonsRepository');
    cacheManager = moduleRef.get<any>('CACHE_MANAGER');
  });

  describe('createPersons', () => {
    it('должен создать персон из фильма', async () => {

      const createdPerson = { id: 1, ...createPersonDto };
      jest.spyOn(personsRepository, 'create').mockResolvedValue(createdPerson);

      const result = await personsService.createPersons(createPersonDto);

      expect(personsRepository.create).toHaveBeenCalledWith(createPersonDto);
      expect(result).toEqual(createdPerson);
    });
  });

  describe('getPersonsByFilmId', () => {
    it('должен вернуть персон из фильма по filmId', async () => {
      const filmId = 1;
      const persons = { filmId, director: 'John Doe' };
      jest.spyOn(personsRepository, 'findOne').mockResolvedValue(createPersonDto);
      jest.spyOn(personsService, 'makePersonsInfo').mockReturnValue(createPersonDto);

      const result = await personsService.getPersonsByFilmId(filmId);

      expect(personsRepository.findOne).toHaveBeenCalledWith({
        where: { filmId },
      });
      expect(personsService.makePersonsInfo).toHaveBeenCalledWith(persons);
      expect(result).toEqual(persons);
    });

    it('должен вернуть сообщение с ошибкой если персоны не найдены', async () => {
      const filmId = 1;
      jest.spyOn(personsRepository, 'findOne').mockResolvedValue(null);
      const expectedMessage = `Персоны с данным personId ${filmId} не найдены`;

      const result = await personsService.getPersonsByFilmId(filmId);

      expect(personsRepository.findOne).toHaveBeenCalledWith({
        where: { filmId },
      });
      expect(result).toEqual({ message: expectedMessage });
    });
  });

  describe('findFilmIdByActorOrDirector', () => {
    it('должен вернуть массив filmId по актеру или режиссеру или вместе', async () => {
      const directorName = 'John Doe';
      const actorName = 'Jane Smith';
      const persons = [
        { filmId: 1, director: directorName, actors: [actorName] },
        { filmId: 2, director: 'Jane Doe', actors: [actorName] },
        { filmId: 3, director: directorName, actors: [] },
      ];
      jest.spyOn(personsRepository, 'findAll').mockResolvedValue(persons);
      const expectedFilmIds = persons.map((person) => person.filmId);

      const result = await personsService.findFilmIdByActorOrDirector(
          directorName,
          actorName,
      );

      expect(personsRepository.findAll).toHaveBeenCalledWith({
        where: {
          director: { [Op.iLike]: `%${directorName.trim()}%` },
          actors: { [Op.contains]: [`${actorName.trim()}`] },
        },
      });
      expect(result).toEqual(expectedFilmIds);
    });
  });

  describe('getDirectorByName', () => {
    it('должен вернуть информацию о режиссере по имени', async () => {
      const name = 'John Doe';
      const persons = [
        { director: name, filmId: 1 },
        { director: 'Jane Smith', filmId: 2 },
      ];
      jest.spyOn(personsRepository, 'findAll').mockResolvedValue(persons);
      jest
          .spyOn(cacheManager, 'get')
          .mockResolvedValue(undefined)
          .mockResolvedValue(persons);
      jest.spyOn(cacheManager, 'set').mockResolvedValue(undefined);
      const expectedDirectorInfo = persons.map((person) => ({
        director: person.director,
        filmId: person.filmId,
      }));

      const result = await personsService.getDirectorByName({ name });

      expect(personsRepository.findAll).toHaveBeenCalledWith({
        where: { director: { [Op.like]: `%${name}%` } },
        limit: 10,
      });
      expect(cacheManager.get).toHaveBeenCalledWith(`getDirectorByName:${name}`);
      expect(cacheManager.set).toHaveBeenCalledWith(
          `getDirectorByName:${name}`,
          expectedDirectorInfo,
      );
      expect(result).toEqual(expectedDirectorInfo);
    });

    it('должен вернуть кеш режиссера', async () => {
      const name = 'John Doe';
      const directorInfo = [
        { director: name, filmId: 1 },
        { director: 'Jane Smith', filmId: 2 },
      ];
      jest.spyOn(cacheManager, 'get').mockResolvedValue(directorInfo);

      const result = await personsService.getDirectorByName({ name });

      expect(cacheManager.get).toHaveBeenCalledWith(`getDirectorByName:${name}`);
      expect(result).toEqual(directorInfo);
    });
  });

});
