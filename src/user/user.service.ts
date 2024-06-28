import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthUser, AuthUserDocument } from './user.schema';
import { Model } from 'mongoose';
import { UserDto } from './user.interface';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { RegisterUser } from './user.interface';

dotenv.config({});

@Injectable()
export class UserService {
  constructor(
    @InjectModel(AuthUser.name) public authUserModel: Model<AuthUserDocument>,
  ) {}

  async signUp(signDetails: UserDto): Promise<RegisterUser> {
    try {
      const { password } = signDetails;
      const hashedPassword = await bcrypt.hash(password, 10);

      const userRegister = await this.authUserModel.create({
        userName: signDetails.userName,
        password: hashedPassword,
        createdAt: signDetails.createdAt,
      });

      const { id, userName } = userRegister;
      const token = await jwt.sign(
        { id, userName },
        process.env.SECRET_VERIFICATION_KEY,
      );

      console.log('SignIn Details : \n', userRegister);

      return { message: "Successfully Registered",id, userName, token };
    } catch (err) {
      console.log(err);
    }
  }

  async login(loginDetails: UserDto): Promise<RegisterUser> {
    const { userName, password } = loginDetails;

    const userDetails = await this.authUserModel.findOne({
      userName: userName,
    });

    if (!userDetails) {
      throw new UnauthorizedException('Invalid Username');
    }

    const checkPassword = await bcrypt.compare(password, userDetails.password);

    if (checkPassword) {
      const { id, userName } = userDetails;
      const token = jwt.sign(
        { id, userName },
        process.env.SECRET_VERIFICATION_KEY,
      );

      return { message: 'Login Successful', id, userName, token };
    } else {
      throw new UnauthorizedException('Invalid Password');
    }
  }
}
