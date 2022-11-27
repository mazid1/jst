import { ArrowRightIcon } from '@chakra-ui/icons';
import { Button, VStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const pages = ['Applications', 'Organizations'];

const Sidenav = () => {
  return (
    <VStack as="nav" maxW={'200px'} alignItems="start">
      {pages.map((page) => (
        <Button
          leftIcon={<ArrowRightIcon />}
          variant="ghost"
          as={Link}
          to={page.toLowerCase()}
          w="100%"
          justifyContent={'start'}
        >
          {page}
        </Button>
      ))}
    </VStack>
  );
};

export default Sidenav;
