import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    if (req.headers['authorization']) {
      const token = req.headers['authorization'].split(' ')[1];
      jwt.verify(token, process.env.SECRET_VERIFICATION_KEY, (err, decoded) => {
        if (err) {
          throw new UnauthorizedException('Failed to Authenticate');
        } else {
          req['decoded'] = decoded;
          next();
        }
      });
    } else {
      throw new UnauthorizedException('Token Not Provided');
    }
  }
}
