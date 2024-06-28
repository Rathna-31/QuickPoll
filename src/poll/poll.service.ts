import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, model } from 'mongoose';
import { AuthUser, AuthUserDocument } from 'src/user/user.schema';
import { Option, PollDB, optionDocument, pollDocument } from './poll.schema';
import { Options, QuestionOption } from './poll.interface';

@Injectable()
export class PollService {
  constructor(
    @InjectModel(AuthUser.name) private authUserModel: Model<AuthUserDocument>,
    @InjectModel(PollDB.name) private pollModel: Model<pollDocument>,
    @InjectModel(Option.name) private optionModel: Model<optionDocument>,
  ) {}

  async createUserPoll(id: string, body: QuestionOption): Promise<any> {
    try {
      const { question, options } = body;

      const findUser = await this.authUserModel.findById(id);

      const createOptions = await this.optionModel.create(
        options.map((option) => ({
          userOption: option.userOption,
          votes: 0,
        })),
      );

      const createPoll = await this.pollModel.create({
        question: question,
        options: createOptions.map((option) => option._id),
      });

      await findUser.polls.push(createPoll._id as Types.ObjectId);

      const b = await findUser.save();
      console.log('b', b);

      return { message: 'Poll Successfully created ' };
    } catch (err) {
      console.log(err);
    }
  }

  async showPolls(): Promise<any> {
    try {
      const fetchAllPolls = await this.pollModel
        .find({})
        .populate('user')
        .populate('options');
      return fetchAllPolls;
    } catch (err) {
      console.log(err);
      throw new NotFoundException();
    }
  }

  async userPolls(id: string): Promise<any> {
    try {
      const findUser = await this.authUserModel.findById(id).populate({
        path: 'polls',
        populate: { path: 'options', model: 'Option' },
      });

      return { polls: findUser.polls };
    } catch (err) {
      console.log(err);

      throw new UnauthorizedException('Invalid Id');
    }
  }

  
}
