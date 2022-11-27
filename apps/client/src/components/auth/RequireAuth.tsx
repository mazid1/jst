import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectCurrentUser } from '../../redux/slices/userSlice';

interface Props {
  children?: ReactJSXElement;
}

const RequireAuth = ({ children }: Props) => {
  const user = useSelector(selectCurrentUser);

  if (!user) return <Navigate to={'/login'} replace />;

  return children ? children : <Outlet />;
};

export default RequireAuth;
