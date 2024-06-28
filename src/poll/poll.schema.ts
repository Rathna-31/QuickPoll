import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuthUser, AuthUserDocument } from 'src/user/user.schema';
import mongoose, { Document, Types } from 'mongoose';

export type pollDocument = PollDB & Document;

export type optionDocument = Option & Document;

@Schema()
export class PollDB extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'AuthUser' })
  user: AuthUserDocument;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ required: true, trim: true })
  question: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Option' }] })
  options: optionDocument[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AuthUser' }] })
  voted:  AuthUserDocument[];
}

@Schema()
export class Option extends Document {
  @Prop({ required: true })
  userOption: string;

  @Prop({ required: true, default: 0 })
  votes: number;
}

export const pollSchema = SchemaFactory.createForClass(PollDB);

export const optionSchema = SchemaFactory.createForClass(Option);
