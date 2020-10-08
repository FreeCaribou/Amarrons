import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { App } from './app.entity';
import { ConfigModule } from '@nestjs/config'
import { MarkersModule } from './markers/markers.module';
import { UsersModule } from './users/users.module';
import { EncryptionModule } from './encryption/encryption.module';
import appConfig from './common/config/app.config';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      // ignoreEnvFile: true,
      // load: [appConfig],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.NODE_ENV === 'prod' ? process.env.DATABASE_NAME : process.env.DATABASE_NAME_TEST,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      logging: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
    TypeOrmModule.forFeature([App]),
    MarkersModule,
    UsersModule,
    EncryptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
