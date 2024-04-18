import { Request } from 'express';
import { UserPayload } from './user-payload';

export interface UserRequest extends Request {
  user: UserPayload;
}
