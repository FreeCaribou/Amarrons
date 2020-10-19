import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Marker } from './entities/marker.entity';
import { Repository, Between, MoreThanOrEqual } from 'typeorm';
import { MarkerPositionSearchDto } from './dto/marker-position-search.dto';
import { MarkerType } from './entities/marker-type.entity';
import { CreateMarkerDto } from './dto/create-marker.dto';
import { MarkerOption } from './entities/marker-option.entity';
import { deleteSensitiveDataFromMarker } from '../common/utils';

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

  async findAll(markerPositionSearchDto: MarkerPositionSearchDto) {
    let markers = await this.markerRepository.find({
      relations: ['markerType', 'markerOptions', 'suggestedBy', 'validatedBy'],
      where: {
        lat: Between(markerPositionSearchDto.southWestLat, markerPositionSearchDto.northEastLat),
        lng: Between(markerPositionSearchDto.southWestLng, markerPositionSearchDto.northEastLng),
        validatedBy: MoreThanOrEqual(1)
      },
    });

    // We cannot for the moment do more specify select with TypeORM
    return deleteSensitiveDataFromMarker(markers);
  }

  // Role 0 or 1, create proposal marker
  // Role 2 or 3, create marker
  async create(createMarkerDto: CreateMarkerDto, userToken) {
    const jwt = require('jsonwebtoken');
    const user = jwt.verify(userToken, process.env.JWT_SECURITY_KEY);
    console.log(user);
    createMarkerDto.suggestedBy = user;
    if (user.role.code == '2' || user.role.code == '3') {
      createMarkerDto.validatedBy = user;
    }
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
