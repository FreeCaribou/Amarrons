import { Controller, Get, Query, Body, Post, Headers, Put, Param, Delete } from '@nestjs/common';
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
  findAllValidated(@Query() markerPositionSearchDto: MarkerPositionSearchDto) {
    return this.markersService.findAllValidated(markerPositionSearchDto);
  }

  @Auth(RoleEnum.Connected)
  @Get('/:id')
  findOne(@Param('id') id: string, @Headers() header) {
    return this.markersService.findOne(id, header.user_token);
  }

  @Auth(RoleEnum.Connected)
  @Delete('/:id')
  deleteOne(@Param('id') id: string, @Headers() header) {
    return this.markersService.deleteOne(id, header.user_token);
  }

  @Auth(RoleEnum.Modo, RoleEnum.Admin)
  @Get('/modo/invalidated')
  findAllinvalidated() {
    return this.markersService.findAllInvalidated();
  }

  @Auth(RoleEnum.Modo, RoleEnum.Admin)
  @Put('/modo/validate/:id')
  updateValidated(@Param('id') id: string, @Headers() header) {
    return this.markersService.validateMarker(id, header.user_token)
  }

  @Auth(RoleEnum.Modo, RoleEnum.Admin)
  @Get('/modo')
  findAll(@Query() markerPositionSearchDto: MarkerPositionSearchDto) {
    return this.markersService.findAll(markerPositionSearchDto);
  }

  @Auth(RoleEnum.Connected)
  @Post()
  create(@Body() createMarkerDto: CreateMarkerDto, @Headers() header) {
    return this.markersService.create(createMarkerDto, header.user_token);
  }

  @Auth(RoleEnum.Connected)
  @Put('/:id')
  updateOne(@Param('id') id: string, @Body() createMarkerDto: CreateMarkerDto, @Headers() header) {
    return this.markersService.updateOne(id, createMarkerDto, header.user_token);
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
