import { z } from 'zod';
import { Application } from '../../@types';
import { asOptionalField } from '../../helpers/zodHelper';

export const ApplicationStatusEnum = z.enum([
  'Todo',
  'Applied',
  'Interviewing',
  'Negotiating',
  'Accepted',
  'Rejected',
  'Denied',
]);

export type ApplicationStatus = z.infer<typeof ApplicationStatusEnum>;

export const applicationSchema = z.object({
  position: z.string().nonempty('Job Title is required'),
  description: asOptionalField(z.string().nonempty()),
  status: ApplicationStatusEnum,
  location: asOptionalField(z.string().nonempty()),
  source: z
    .object({
      label: asOptionalField(z.string().nonempty()),
      url: asOptionalField(z.string().nonempty()),
    })
    .optional(),
  appliedDate: asOptionalField(z.coerce.date()),
  notes: asOptionalField(z.string()),
  organization: asOptionalField(z.string()),
});

export type CreateApplicationDto = z.infer<typeof applicationSchema>;

export function transformToCreateApplicationDto(
  application: Application | undefined
): CreateApplicationDto | undefined {
  if (!application) return undefined;
  return {
    position: application.position,
    description: application.description,
    status: application.status,
    location: application.location,
    source: { ...application.source },
    appliedDate: application.appliedDate
      ? new Date(application.appliedDate)
      : new Date(),
    notes: application.notes,
    organization: application.organization?._id,
  };
}
