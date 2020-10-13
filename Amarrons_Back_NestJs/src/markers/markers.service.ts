import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Marker } from './entities/marker.entity';
import { Repository, LessThanOrEqual, MoreThanOrEqual, Between } from 'typeorm';
import { MarkerPositionSearchDto } from './dto/marker-position-search.dto';
import { MarkerType } from './entities/marker-type.entity';
import { CreateMarkerDto } from './dto/create-marker.dto';
import { MarkerOption } from './entities/marker-option.entity';

@Injectable()
export class MarkersService {

  constructor(
    @InjectRepository(Marker)
    private readonly markerRepository: Repository<Marker>,
    @InjectRepository(MarkerType)
    private readonly markerTypeRepository: Repository<MarkerType>,
    @InjectRepository(MarkerOption)
    private readonly markerOptionRepository: Repository<MarkerOption>
  ) { }

  findAll(markerPositionSearchDto: MarkerPositionSearchDto) {
    return this.markerRepository.find({
      relations: ['markerType', 'markerOptions'],
      where: {
        lat: Between(markerPositionSearchDto.southWestLat, markerPositionSearchDto.northEastLat),
        lng: Between(markerPositionSearchDto.southWestLng, markerPositionSearchDto.northEastLng)
      }
    })
  }

  // TODO depending on the user role, the create will be different
  // Role 0 or 1, create proposal marker
  // Role 2 or 3, create marker
  async create(createMarkerDto: CreateMarkerDto, userToken) {
    const jwt = require('jsonwebtoken');
    const user = jwt.verify(userToken, process.env.JWT_SECURITY_KEY);
    console.log(user);
    const marker = this.markerRepository.create(createMarkerDto);
    return this.markerRepository.save(marker);
  }

  findAllMarkerTypes() {
    return this.markerTypeRepository.find();
  }

  findAllMarkerOptions() {
    return this.markerOptionRepository.find();
  }

}
