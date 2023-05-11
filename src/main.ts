import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function persons() {
  const PORT = process.env.PORT || 4070;
  const app = await NestFactory.create(AppModule, {cors:true});
  await app.listen(PORT, ()=> console.log(`Server Persons is started on PORT = ${PORT} `));
}

persons();
