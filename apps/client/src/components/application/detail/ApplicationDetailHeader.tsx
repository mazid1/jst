import { Application } from '../../../@types/application';

type ApplicationDetailHeaderProps = {
  application: Application;
};

const ApplicationDetailHeader = (props: ApplicationDetailHeaderProps) => {
  const { application } = props;

  return <div>{application.position}</div>;
};

export default ApplicationDetailHeader;
