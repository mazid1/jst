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
import { AsyncCreatableSelect, Select } from 'chakra-react-select';
import capitalize from 'lodash/capitalize';
import { useMemo } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Application } from '../../@types';
import { handleError } from '../../helpers/handleError';
import {
  useCreateApplicationMutation,
  useUpdateApplicationMutation,
} from '../../redux/api/applicationApiSlice';
import {
  useGetOrganizationsFilteredQuery,
  useLazyGetOrganizationsFilteredQuery,
} from '../../redux/api/organizationApiSlice';
import {
  ApplicationStatusEnum,
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
    control,
  } = useForm<CreateApplicationDto>({
    resolver: zodResolver(applicationSchema),
    values: createApplicationDto,
  });

  const [createApplication] = useCreateApplicationMutation();
  const [updateApplication] = useUpdateApplicationMutation();
  const [getFilteredOrganizations] = useLazyGetOrganizationsFilteredQuery();
  const { data: organizations } = useGetOrganizationsFilteredQuery({
    name: '',
  });

  const defaultOrgsOptions =
    organizations?.map((o) => ({ label: o.name, value: o._id })) ?? [];

  const loadOptions = async (inputValue: string) => {
    try {
      const filteredOrgs = await getFilteredOrganizations({
        name: inputValue,
      }).unwrap();
      return filteredOrgs?.map((o) => ({ label: o.name, value: o._id })) ?? [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const toast = useToast();

  const options = useMemo(
    () =>
      Object.values(ApplicationStatusEnum.Values).map((v) => ({
        label: capitalize(v),
        value: v,
      })),
    []
  );

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

      <Controller
        name="organization"
        control={control}
        render={({ field: { name, onBlur, onChange, ref, value } }) => (
          <FormControl isInvalid={!!errors.organization}>
            <FormLabel>Company Name</FormLabel>
            <AsyncCreatableSelect
              ref={ref}
              name={name}
              onBlur={onBlur}
              onChange={(v) => onChange(v?.value)}
              value={defaultOrgsOptions.find((o) => o.value === value)}
              cacheOptions
              defaultOptions={defaultOrgsOptions}
              loadOptions={loadOptions}
            />
            <FormErrorMessage>{errors.organization?.message}</FormErrorMessage>
          </FormControl>
        )}
      />

      <Controller
        name="status"
        control={control}
        render={({ field: { name, onBlur, onChange, ref, value } }) => (
          <FormControl isInvalid={!!errors.status}>
            <FormLabel>Application Status</FormLabel>
            <Select
              name={name}
              onBlur={onBlur}
              onChange={(v) => onChange(v?.value)}
              ref={ref}
              value={options.find((o) => o.value === value)}
              options={options}
            />
            <FormErrorMessage>{errors.status?.message}</FormErrorMessage>
          </FormControl>
        )}
      />

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
    </form>
  );
}

export default ApplicationForm;
