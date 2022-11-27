import { CodeResponse, useGoogleLogin } from '@react-oauth/google';
import React from 'react';
import { useLoginMutation } from '../../redux/slices/authApiSlice';
import GoogleSignInButton from '../common/GoogleSignInButton';

const LoginPage = () => {
  const [login] = useLoginMutation();

  const startLogin = async (codeResponse: CodeResponse) => {
    const { code } = codeResponse;
    try {
      const { name, email, picture } = await login({ code }).unwrap();
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

  return (
    <div>
      <GoogleSignInButton onClick={requestUserConsent} />
    </div>
  );
};

export default LoginPage;
