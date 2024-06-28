import { Request } from 'express';

export interface pollCreate {}

export interface Options {
  userOption: string;
  votes?: number;
}

export interface QuestionOption {
  question: string;
  options: Options[];
}

export interface UserRequest extends Request {
  decoded: {
    id: string;
  };
}
