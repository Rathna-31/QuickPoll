import { Module } from '@nestjs/common';
import { PollController } from './poll.controller';
import { PollService } from './poll.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Option, PollDB, optionSchema, pollSchema } from './poll.schema';
import { UserModule } from 'src/user/user.module';
import { AuthUser, AuthUserSchema } from 'src/user/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PollDB.name, schema: pollSchema },
      { name: Option.name, schema: optionSchema },
      { name: AuthUser.name, schema: AuthUserSchema },
    ]),

    UserModule,
  ],
  controllers: [PollController],
  providers: [PollService],
})
export class PollModule {}
