import { Controller, Get, Query, Body, Post } from '@nestjs/common';
import { MarkersService } from './markers.service';
import { MarkerPositionSearchDto } from './dto/marker-position-search.dto';
import { Auth } from '../common/decorators/auth.decorator';
import { RoleEnum } from '../common/role.enum';
import { CreateMarkerDto } from './dto/create-marker.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Marker')
@Controller('markers')
export class MarkersController {

  constructor(
    private readonly markersService: MarkersService
  ) { }

  @Get()
  findAll(@Query() markerPositionSearchDto: MarkerPositionSearchDto) {
    return this.markersService.findAll(markerPositionSearchDto);
  }

  @Auth(RoleEnum.Admin)
  @Post()
  create(@Body() createMarkerDto: CreateMarkerDto) {
    return this.markersService.create(createMarkerDto);
  }

  @Auth(RoleEnum.Connected)
  @Get('/types')
  findAllMarkerTypes() {
    return this.markersService.findAllMarkerTypes();
  }

  @Auth(RoleEnum.Connected)
  @Get('/options')
  findAllMarkerOptions() {
    return this.markersService.findAllMarkerOptions();
  }

}
