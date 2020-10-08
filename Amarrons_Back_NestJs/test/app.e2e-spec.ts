import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { fullInDbForDevMode } from './../src/common/migration-array-string';
import { markerWithoutPosition, markerWithPositionAndOneMarker } from './marker.test';

let connection;

async function eraseAll() {
  console.log('ERASE ALL');
  for (const e of fullInDbForDevMode) {
    await connection.query(e);
  }
}

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    connection = getConnection();

    await eraseAll();
    for (const e of fullInDbForDevMode) {
      await connection.query(e);
    }
    await app.init();

  });

  describe('Simple Test', () => {

    it('(GET) / App run', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Hello World!');
    });

    it('(GET) /app DB run', () => {
      return request(app.getHttpServer())
        .get('/app')
        .expect(200)
        .expect([]);
    });

  });

  describe('Marker Test', () => {
    it('(GET) /markers No validate request', () => markerWithoutPosition(app.getHttpServer()));
    it('(GET) /markers Validate request with Cinquantenaire', () => markerWithPositionAndOneMarker(app.getHttpServer()))
  });

  afterAll(async () => {
    // await eraseAll();
    connection = await getConnection().close();
    await app.close();
  });
});
