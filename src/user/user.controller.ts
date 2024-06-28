import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto, RegisterUser } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  @HttpCode(201)
  signUp(@Body() signUpDto: UserDto): Promise<RegisterUser> {
    try {
      return this.userService.signUp(signUpDto);
    } catch (err) {
      throw new BadRequestException('Invalid Registration Details');
    }
  }

  @Post('/login')
  @HttpCode(201)
  login(@Body() loginDto: UserDto): Promise<RegisterUser> {
    try {
      return this.userService.login(loginDto);
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Enter Valid Credentials');
    }
  }
}
