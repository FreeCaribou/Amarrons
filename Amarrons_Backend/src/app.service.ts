import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { App } from './app.entity';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(App)
    private appRepository: Repository<App>,
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  getApp(): Promise<any> {
    return this.appRepository.find();
  }

}
