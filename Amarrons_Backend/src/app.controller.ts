import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    console.log('environement', process.env.NODE_ENV);
    return this.appService.getHello();
  }

  @Get('app')
  getApp(): any {
    return this.appService.getApp();
  }
}
