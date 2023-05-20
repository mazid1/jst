import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Application } from '../../@types';
import { handleError } from '../../helpers/handleError';
import {
  useCreateApplicationMutation,
  useUpdateApplicationMutation,
} from '../../redux/api/applicationApiSlice';
import {
  CreateApplicationDto,
  applicationSchema,
  transformToCreateApplicationDto,
} from './applicationSchema';

export const APPLICATION_FORM_ID = 'applicationForm';

export type ApplicationFormProps = {
  onSuccess: () => void;
  application?: Application;
};

function ApplicationForm(props: ApplicationFormProps) {
  const { onSuccess, application } = props;
  const createApplicationDto = transformToCreateApplicationDto(application);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateApplicationDto>({
    resolver: zodResolver(applicationSchema),
    values: createApplicationDto,
  });

  const [createApplication] = useCreateApplicationMutation();
  const [updateApplication] = useUpdateApplicationMutation();

  const toast = useToast();

  const onSubmit: SubmitHandler<CreateApplicationDto> = async (data) => {
    const isUpdating = !!application;
    try {
      const newApplication = isUpdating
        ? await updateApplication({
            application: data,
            id: application._id,
          }).unwrap()
        : await createApplication(data).unwrap();
      toast({
        title: isUpdating ? 'Updated.' : 'Created.',
        description: (
          <Text>
            Job application {isUpdating ? 'updated' : 'created'} for the
            position of <strong>{newApplication.position}</strong>.
          </Text>
        ),
        status: 'success',
        isClosable: true,
      });
      onSuccess();
    } catch (error) {
      console.log(error);
      handleError(error, toast);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id={APPLICATION_FORM_ID}>
      <FormControl isInvalid={!!errors.position} isRequired>
        <FormLabel>Job Title</FormLabel>
        <Input type="text" {...register('position')} />
        <FormErrorMessage>{errors.position?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.description}>
        <FormLabel>Job Description</FormLabel>
        <Textarea {...register('description')} />
        <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.status}>
        <FormLabel>Application Status</FormLabel>
        <Input type="text" {...register('status')} />
        <FormErrorMessage>{errors.status?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.location}>
        <FormLabel>Job Location</FormLabel>
        <Input type="text" {...register('location')} />
        <FormErrorMessage>{errors.location?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.source?.url}>
        <FormLabel>URL of Job Posting</FormLabel>
        <Input type="url" {...register('source.url')} />
        <FormErrorMessage>{errors.source?.url?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.appliedDate}>
        <FormLabel>Applied Date</FormLabel>
        <Input type="date" {...register('appliedDate')} />
        <FormErrorMessage>{errors.appliedDate?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.notes}>
        <FormLabel>Notes</FormLabel>
        <Textarea {...register('notes')} />
        <FormErrorMessage>{errors.notes?.message}</FormErrorMessage>
      </FormControl>

      {/* TODO: use search and select, with a way to create new organization */}
      <FormControl isInvalid={!!errors.organization}>
        <FormLabel>Company Name</FormLabel>
        <Input type="text" {...register('organization')} />
        <FormErrorMessage>{errors.organization?.message}</FormErrorMessage>
      </FormControl>
    </form>
  );
}

export default ApplicationForm;
