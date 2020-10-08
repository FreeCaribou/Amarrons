import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { VerifyRightDto } from './dto/verify-right.dto';
import { Auth } from '../common/decorators/auth.decorator';
import { RoleEnum } from '../common/role.enum';
import { ApiTags } from '@nestjs/swagger';

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

}
