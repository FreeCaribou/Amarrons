import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { fullInDbForDevMode } from './common/migration-array-string';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { readImportReferenceDataFile } from './common/import-reference-data';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Amarrons API')
    .setDescription('All the route for the Amarrons backend')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );

  app.enableCors();

  await app.listen(process.env.PORT || 1444);

  console.log('environement', process.env.NODE_ENV);

  if (process.env.NODE_ENV == 'dev') {
    const connection = getConnection();
    for (const e of fullInDbForDevMode) {
      await connection.query(e);
    }
    console.log('DB op');
  }
  else if (process.env.NODE_ENV == 'prod') {
    await readImportReferenceDataFile();
  }

}
bootstrap();
