import { Stack } from '@chakra-ui/react';
import { Application } from '../../../@types/application';
import ApplicationDetailHeader from './ApplicationDetailHeader';

type ApplicationDetailLayoutProps = {
  application: Application;
};

const ApplicationDetailLayout = (props: ApplicationDetailLayoutProps) => {
  const { application } = props;
  return (
    <Stack>
      <ApplicationDetailHeader application={application} />
    </Stack>
  );
};

export default ApplicationDetailLayout;
