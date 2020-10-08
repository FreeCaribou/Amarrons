import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { EncryptionService } from '../encryption/encryption.service';
import { Role } from './entities/role.entity';
import { VerifyRightDto } from './dto/verify-right.dto';
import { RoleEnum } from '../common/role.enum';

@Injectable()
export class UsersService {

  jwt = require('jsonwebtoken');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly encryptionService: EncryptionService
  ) { }

  async signUp(signUpUserDto: SignUpUserDto) {
    // verify not double email
    const findOneByEmail = await this.findUserByEmail(signUpUserDto.email);
    console.log(findOneByEmail);
    if (findOneByEmail) {
      console.log('hoho there is yet one with the same email');
      // TODO the message
      throw new HttpException({ message: ['Email already in use'] }, HttpStatus.BAD_REQUEST);
    }

    // encrypt the password
    const encryptPwd = await this.encryptionService.hash(signUpUserDto.password);

    // find the simple-user / code 3 role
    const simpleUserRole = await this.findRoleByCode('1');

    // let create it with the basic simple-user role
    let user = await this.userRepository.create({
      name: signUpUserDto.name,
      email: signUpUserDto.email,
      password: encryptPwd,
      role: simpleUserRole
    });

    await this.userRepository.save(user);

    const token = await this.createUserToken(user);
    return { token }
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.findUserByEmail(loginUserDto.email);

    // the user exist?
    if (!user) {
      throw new HttpException({ message: ['Are you already registered?'] }, HttpStatus.BAD_REQUEST);
    }

    // it is the good password?
    if (!await this.encryptionService.compare(loginUserDto.password, user.password)) {
      throw new HttpException({ message: ['Bad password.'] }, HttpStatus.BAD_REQUEST);
    }

    const token = await this.createUserToken(user);

    return { token };
  }

  findAllUsers() {
    return this.userRepository.find({ relations: ['role'] });
  }

  findUserByEmail(email: string) {
    return this.userRepository.findOne({ email: email }, { relations: ['role'] });
  }

  findRoleByCode(code: string) {
    return this.roleRepository.findOne({ code });
  }

  createUserToken(user: User) {
    return this.jwt.sign({ name: user.name, role: user.role, id: user.id }, process.env.JWT_SECURITY_KEY);
  }

  async verifyRight(verifyRightDto: VerifyRightDto) {
    const userRole = this.jwt.verify(verifyRightDto.token, process.env.JWT_SECURITY_KEY).role.code;

    let isAuthorized = false;
    if (verifyRightDto.authorizedRoles === RoleEnum.Connected) {
      isAuthorized = true;
      return { isAuthorized };
    }

    const roleArray = verifyRightDto.authorizedRoles.split(',');

    try {
      roleArray.forEach(e => {
        if (e === userRole || e === RoleEnum.Connected) {
          isAuthorized = true;
        }
      })
    } catch (error) {
      throw new HttpException({ message: ['There is an unexpected error with your request'] }, HttpStatus.BAD_REQUEST);
    }

    return { isAuthorized };
  }

}
