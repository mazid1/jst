import { ApplicationStatus } from './applicationStatus';
import { Interview } from './interview';
import { LinkData } from './linkData';
import { Organization } from './organization';

export type Application = {
  _id: string;
  position: string;
  description?: string;
  status: ApplicationStatus;
  location?: string;
  source?: LinkData;
  appliedDate?: Date;
  rejectedDate?: Date;
  acceptedDate?: Date;
  deniedDate?: Date;
  notes?: string;
  organization?: Organization;
  interviews?: Interview[];
};
