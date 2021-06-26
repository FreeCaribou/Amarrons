import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './guards/auth.guard';

@Module(
  {
    imports: [ConfigModule],
    // providers: [{ provide: APP_GUARD, useClass: AuthGuard }]
  }
)
export class CommonModule { }
