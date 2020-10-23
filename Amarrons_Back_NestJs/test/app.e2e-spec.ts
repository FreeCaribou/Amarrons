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

  let adminToken;
  let simpleUserToken;

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

  describe('Users connection', () => {
    it('(POST) /users/login With one admin', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/login')
        .send({ email: "samy@amarrons.eu", password: "jeMeNoie" })
        .expect(201);

      adminToken = response.body.token;

      expect(adminToken).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/);
    });

    it('(POST) /users/login With one simple user', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/login')
        .send({ email: "raoul@amarrons.eu", password: "jeMeNoie" })
        .expect(201);

      simpleUserToken = response.body.token;
      expect(simpleUserToken).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/);
    });

    it('(GET) /verifyRight Access without token denied', () => {
      return request(app.getHttpServer())
        .get(`/users/verifyRight?token=${adminToken}&authorizedRoles=3`)
        .expect(403);
    });

    it('(GET) /verifyRight Admin access to admin zone', async () => {
      const response = await request(app.getHttpServer())
        .get(`/users/verifyRight?token=${adminToken}&authorizedRoles=3`)
        .set('user_token', adminToken)
        .expect(200);

      const body = response.body;
      expect(body.isAuthorized).toBe(true);
    });

    it('(GET) /verifyRight Simple user access to admin zone, denied', async () => {
      const response = await request(app.getHttpServer())
        .get(`/users/verifyRight?token=${simpleUserToken}&authorizedRoles=3`)
        .set('user_token', simpleUserToken)
        .expect(200);

      const body = response.body;
      expect(body.isAuthorized).toBe(false);
    });

    it('(GET) /verifyRight Simple user access to connected zone', async () => {
      const response = await request(app.getHttpServer())
        .get(`/users/verifyRight?token=${simpleUserToken}&authorizedRoles=0`)
        .set('user_token', simpleUserToken)
        .expect(200);

      const body = response.body;
      expect(body.isAuthorized).toBe(true);
    });
  })

  describe('Marker Test', () => {
    it('(GET) /markers No validate request', () => markerWithoutPosition(app.getHttpServer()));
    it('(GET) /markers Validate request with Cinquantenaire', () => markerWithPositionAndOneMarker(app.getHttpServer()));
  });

  afterAll(async () => {
    // await eraseAll();
    connection = await getConnection().close();
    await app.close();
  });
});
