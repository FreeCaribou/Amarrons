import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { EncryptionModule } from '../encryption/encryption.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    EncryptionModule
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule { }
