const Home = () => {
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
      <button onClick={getProfile}>Who am I</button>
      <button onClick={refresh}>Refresh Token</button>
    </>
  );
};

export default Home;
