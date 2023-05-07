import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Transport} from "@nestjs/microservices";

/*"FilmListener":"nest start --watch --config listener.json",
что бы микросервис работал параллельно с прослушивание порта
добавляем в package.json*/
async function microService() {

    const app = await NestFactory.createMicroservice(AppModule,{
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://rabbitmq:5672'],
            queue: 'films_queue',
            queueOptions: {
                durable: false
            },
        },
    });

    await app.listen()
    console.log("MicroService Persons is listening")
}


microService()