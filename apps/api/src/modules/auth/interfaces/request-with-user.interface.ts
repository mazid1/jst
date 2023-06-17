import { Request } from 'express';
import { UserDocument } from '../../users/entities/user.entity';

interface RequestWithUser extends Request {
  user: UserDocument;
}

export default RequestWithUser;
