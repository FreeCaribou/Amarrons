import { Module } from '@nestjs/common';
import { MarkersController } from './markers.controller';
import { MarkersService } from './markers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marker } from './entities/marker.entity';
import { MarkerType } from './entities/marker-type.entity';
import { MarkerOption } from './entities/marker-option.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Marker, MarkerType, MarkerOption])
  ],
  controllers: [MarkersController],
  providers: [MarkersService]
})
export class MarkersModule { }
