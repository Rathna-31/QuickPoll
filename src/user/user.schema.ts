import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { pollDocument, PollDB } from 'src/poll/poll.schema';

export type AuthUserDocument = AuthUser & Document;

@Schema()
export class AuthUser extends Document {
  @Prop({ required: true, unique: true })
  userName: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'PollDB' }])
  polls: Types.ObjectId[];
}

export const AuthUserSchema = SchemaFactory.createForClass(AuthUser);
