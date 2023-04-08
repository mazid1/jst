import { BaseEntity } from './baseEntity';

export type Organization = {
  name: string;
  location?: string; // state, country etc.
  minSalary?: number; // min salary in usd
  maxSalary?: number; // max salary in usd
  companySize?: string; // i.e. 50-100
  website?: string; // website url
  linkedinPage?: string; // linkedin page url
  isDeleted?: boolean;
} & BaseEntity;

export type CreateOrganizationDto = Omit<Organization, '_id'>;

export type UpdateOrganizationDto = Partial<CreateOrganizationDto>;