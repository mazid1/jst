import { Divider, Heading } from '@chakra-ui/react';

type PageTitleProps = {
  title: string;
};

function PageTitle({ title }: PageTitleProps) {
  return (
    <>
      <Heading>{title}</Heading>
      <Divider mt={2} mb={6} />
    </>
  );
}

export default PageTitle;
