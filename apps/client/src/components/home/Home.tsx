import { Button } from '@chakra-ui/button';
import { authApiSlice } from '../../redux/api/authApiSlice';
import { useAppDispatch } from '../../redux/hooks';

const Home = () => {
  const dispatch = useAppDispatch();

  const getProfile = async () => {
    const response = await dispatch(
      authApiSlice.endpoints.currentUser.initiate()
    );
    if (response.data) {
      console.log('Profile', response.data);
    } else if (response.error) {
      console.log('Profile error', response.error);
    }
  };

  return (
    <>
      <h1>Job Search Tracker (JST)</h1>
      <Button onClick={getProfile}>Who am I</Button>
    </>
  );
};

export default Home;
