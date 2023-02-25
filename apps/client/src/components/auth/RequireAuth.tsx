import { Progress } from '@chakra-ui/react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentUserQuery } from '../../redux/api/authApiSlice';

interface Props {
  children?: ReactJSXElement;
}

const RequireAuth = ({ children }: Props) => {
  const { isLoading, data: user } = useCurrentUserQuery();

  if (isLoading) return <Progress size="xs" isIndeterminate />;

  console.log({ user });
  if (!user) return <Navigate to={'/login'} replace />;

  return children ? children : <Outlet />;
};

export default RequireAuth;
