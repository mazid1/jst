import { CodeResponse, useGoogleLogin } from '@react-oauth/google';
import { useAppDispatch } from '../../app/hooks';
import { useLoginMutation, useLogoutMutation } from '../auth/authApiSlice';
import { setUser, resetUser } from '../auth/authSlice';

const Home = () => {
  const [login] = useLoginMutation();
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const startLogin = async (codeResponse: CodeResponse) => {
    const { code } = codeResponse;
    try {
      const { name, email, picture } = await login({ code }).unwrap();
      dispatch(setUser({ name, email, picture }));
      console.log(name, email, picture);
    } catch (err) {
      console.log(err);
    }
  };

  const requestUserConsent = useGoogleLogin({
    onSuccess: startLogin,
    onError: (err) => console.log(err),
    flow: 'auth-code',
    scope: 'openid email profile https://www.googleapis.com/auth/drive.appdata',
  });

  const startLogout = async () => {
    try {
      await logout(null).unwrap();
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(resetUser());
    }
  };

  const getProfile = async () => {
    const response = await fetch('/api/users/me');
    const profile = await response.json();
    console.log('Profile', profile);
  };

  const refresh = async () => {
    const response = await fetch('/api/auth/refresh');
    const profile = await response.json();
    console.log('Profile after refresh token', profile);
  };

  return (
    <>
      <h1>Job Search Tracker (JST)</h1>
      <button onClick={requestUserConsent}>Sign in with Google</button>
      <button onClick={getProfile}>Who am I</button>
      <button onClick={refresh}>Refresh Token</button>
      <button onClick={startLogout}>Logout</button>
    </>
  );
};

export default Home;
