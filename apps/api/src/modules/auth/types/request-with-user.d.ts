import { Request } from 'express';
import { UserDocument } from '../../users/entities/user.entity';

export type RequestWithUser = Request & {
  user: UserDocument;
};
