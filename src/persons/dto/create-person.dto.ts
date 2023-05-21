import {ApiProperty} from "@nestjs/swagger";

export class CreatePersonDto {
    @ApiProperty({example: '1', description: 'id фильма к которому относятся весь список участников'})
    readonly filmId: number;

    @ApiProperty({example: 'Мэтт Дэннер', description: 'режиссер'})
    readonly director: string;

    @ApiProperty({example: 'Патрик Кейси, Джош Миллер', description: 'сценаристы'})
    readonly scenario: string;

    @ApiProperty({example: 'Маргарет М. Дин, Кимберли А. Смит', description: 'продюссеры'})
    readonly producer: string;

    @ApiProperty({example: 'Бекки Нюбул,', description: 'операторы'})
    readonly operator: string;

    @ApiProperty({example: 'Бекки Нюбул, Linus of Hollywood, Гэбриел Манн', description: 'композиторы'})
    readonly composer: string;

    @ApiProperty({example: 'Эфраим Клейн', description: 'художники'})
    readonly painter: string;

    @ApiProperty({example: 'Эфраим Клейн', description: 'инсталяторы'})
    readonly installation: string;

    @ApiProperty({example: {"6373": "Дэвид Лодж",
            "24474": "Николас Ройе",
            "39055": "Джессика Ги",
            "111280": "Бен Дискин",
            "262573": "Грант Джордж",
            "1219815": "Фарук Тохид"}, description: 'в главных ролях по ключу можно найти в бд актеров'})
    readonly actors:{};
}