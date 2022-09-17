import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectCurrentUserName } from './authSlice';

interface Props {
  children?: ReactJSXElement;
}

const RequireAuth = ({ children }: Props) => {
  const user = useSelector(selectCurrentUserName);

  if (!user) return <Navigate to={'/'} replace />;

  return children ? children : <Outlet />;
};

export default RequireAuth;
