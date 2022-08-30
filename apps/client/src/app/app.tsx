import { CodeResponse, useGoogleLogin } from '@react-oauth/google';
import Layout from '../layout/Layout';

export function App() {
  const onLoginSuccess = async (codeResponse: CodeResponse) => {
    const { code } = codeResponse;
    const response = await fetch('/api/auth/google-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });
    const userInfo = await response.json();
    console.log(userInfo);
  };

  const login = useGoogleLogin({
    onSuccess: onLoginSuccess,
    onError: (err) => console.log(err),
    flow: 'auth-code',
    scope: 'openid email profile https://www.googleapis.com/auth/drive.appdata',
  });

  const logout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
    });
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
    <Layout>
      <h1>Job Search Tracker (JST)</h1>
      <button onClick={login}>Sign in with Google</button>
      <button onClick={getProfile}>Who am I</button>
      <button onClick={refresh}>Refresh Token</button>
      <button onClick={logout}>Logout</button>
    </Layout>
  );
}

export default App;
