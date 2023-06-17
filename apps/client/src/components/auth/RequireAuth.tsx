import { Progress } from '@chakra-ui/react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { history } from '../../helpers/history';
import { useGetMeQuery } from '../../redux/api/userApiSlice';

interface Props {
  children?: ReactJSXElement;
}

const RequireAuth = ({ children }: Props) => {
  history.location = useLocation();
  const { isLoading, data: user } = useGetMeQuery();

  if (isLoading) return <Progress size="xs" isIndeterminate />;

  if (!user) return <Navigate to={'/login'} />;

  return children ? children : <Outlet />;
};

export default RequireAuth;
