import { Controller, Post, Body, Get, Query, Put, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { VerifyRightDto } from './dto/verify-right.dto';
import { Auth } from '../common/decorators/auth.decorator';
import { RoleEnum } from '../common/role.enum';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User')
@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService
  ) { }

  @Post('/signup')
  signUp(@Body() signUpUserDto: SignUpUserDto) {
    return this.usersService.signUp(signUpUserDto);
  }

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Auth(RoleEnum.Connected)
  @Get('/verifyRight')
  verifyRight(@Query() verifyRightDto: VerifyRightDto) {
    return this.usersService.verifyRight(verifyRightDto);
  }

  @Auth(RoleEnum.Admin)
  @Get()
  findAll() {
    return this.usersService.findAllUsers();
  }

  @Auth(RoleEnum.Admin)
  @Get('/roles')
  findAllRoles() {
    return this.usersService.findAllRoles();
  }

  @Auth(RoleEnum.Admin)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

}
