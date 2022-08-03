import 'dotenv/config';
import { Logger } from '@nestjs/common';
<<<<<<< HEAD
import { NestFactory } from '@nestjs/core';
=======
import { LazyModuleLoader, NestFactory } from '@nestjs/core';
>>>>>>> 3758e2dd493b3456c76a35f83b076a9e4b600c17
import { AppModule } from './app.module';

const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<< HEAD
=======

  // Lazy Loading implementation:-
  // ModuleToBeLazyLoaded(DogModule) is not registered in app.module, so it is not loaded in the first Bootstrap.
  
  // 1-Obtain a reference to the LazyModuleLoader
  // const lazyModuleLoader = app.get(LazyModuleLoader);

  // 2-To lazy load that module  in any service (Say-animal.service.ts).
  // In animal.service.ts:-

  // First import that Module 
  //  const { DogModule } = await import('../dog/dog.module')

  // Second load lazily that module.
  // const moduleRef = await this.lazyModuleLoader.load(() => DogModule)

  // Then use it service.
  // this.service = moduleRef.get(DogService)

//   const { LazyModule } = await import('./lazy.module');
// const moduleRef = await this.lazyModuleLoader.load(() => LazyModule);

>>>>>>> 3758e2dd493b3456c76a35f83b076a9e4b600c17
  await app.listen(process.env.PORT);
  Logger.log(`Server started running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
