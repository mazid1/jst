import { Application } from '../../@types';

export const APPLICATION_FORM_ID = 'applicationForm';

export type ApplicationFormProps = {
  onSuccess: () => void;
  application?: Application;
};

function ApplicationForm(props: ApplicationFormProps) {
  const { onSuccess, application } = props;

  return <form onSubmit={console.log} id={APPLICATION_FORM_ID}></form>;
}

export default ApplicationForm;
