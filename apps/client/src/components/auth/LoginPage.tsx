import { CodeResponse, useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../redux/api/authApiSlice';
import GoogleSignInButton from '../common/GoogleSignInButton';

const LoginPage = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const startLogin = async (codeResponse: CodeResponse) => {
    const { code } = codeResponse;
    try {
      const { name, email, picture } = await login({ code }).unwrap();
      console.log(name, email, picture);
      navigate('/', { replace: true });
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

  return <GoogleSignInButton onClick={requestUserConsent} />;
};

export default LoginPage;
