import { useGoogleLogin } from '@react-oauth/google';

export function App() {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
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
