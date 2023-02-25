import { Progress } from '@chakra-ui/react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Navigate, Outlet } from 'react-router-dom';
import { useMeQuery } from '../../redux/api/userApiSlice';

interface Props {
  children?: ReactJSXElement;
}

const RequireAuth = ({ children }: Props) => {
  const { isLoading, data: user } = useMeQuery();

  if (isLoading) return <Progress size="xs" isIndeterminate />;

  if (!user) return <Navigate to={'/login'} replace />;

  return children ? children : <Outlet />;
};

export default RequireAuth;
