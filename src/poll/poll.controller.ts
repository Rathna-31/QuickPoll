import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QuestionOption } from './poll.interface';
import { PollService } from './poll.service';
import { UserRequest } from './poll.interface';
import { pollDocument } from './poll.schema';

@Controller('poll')
export class PollController {
  constructor(private pollService: PollService) {}

  @Post('create')
  @HttpCode(201)
  async createUserPoll(
    @Req() req: UserRequest,
    @Body() Qop: QuestionOption,
  ): Promise<any> {
    try {
      //console.log(req);
      const { id } = req.decoded;
      console.log('ID : ', id);
      return this.pollService.createUserPoll(id, Qop);
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Enter Valid Data');
    }
  }

  @Get('showpolls')
  @HttpCode(200)
  async showPolls(): Promise<any> {
    try {
      return this.pollService.showPolls();
    } catch (err) {
      console.log(err);

      throw new BadRequestException('User Invalid');
    }
  }

  @Get('userpoll')
  @HttpCode(200)
  async userPolls(@Req() req: UserRequest) : Promise<any>{

    try{

      const {id} = req.decoded;
      return this.pollService.userPolls(id);

    }catch(err){
      console.log(err);

      throw new BadRequestException('Invalid Request');
    }


  }

  @Post('votePoll')
  @HttpCode(201)
  async votePoll(@Param() id: string , @Req() req: UserRequest, @Body() )
}
