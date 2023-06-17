import { type ApplicationStatus } from '../components/application/applicationSchema';
import { BaseEntity } from './baseEntity';
import { Interview } from './interview';
import { LinkData } from './linkData';
import { Organization } from './organization';

export type Application = {
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
} & BaseEntity;
