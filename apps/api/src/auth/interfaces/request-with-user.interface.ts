import { Request } from 'express';
import { UserDocument } from '../../user/entities/user.entity';

interface RequestWithUser extends Request {
  user: UserDocument;
}

export default RequestWithUser;
