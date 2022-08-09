import { CodeResponse, useGoogleLogin } from '@react-oauth/google';

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

  return (
    <>
      <h1>Job Search Tracker (JST)</h1>
      <button onClick={login}>Sign in with Google</button>
    </>
  );
}

export default App;
