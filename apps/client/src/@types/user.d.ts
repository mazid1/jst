import { BaseEntity } from './baseEntity';

export type User = {
  name: string;
  email: string;
  picture?: string;
} & BaseEntity;
