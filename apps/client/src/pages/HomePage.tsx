import { Button } from '@chakra-ui/button';
import { useLocation } from 'react-router-dom';
import { history } from '../helpers/history';
import { userApiSlice } from '../redux/api/userApiSlice';
import { useAppDispatch } from '../redux/hooks';

const HomePage = () => {
  history.location = useLocation();
  const dispatch = useAppDispatch();

  const getProfile = async () => {
    const response = await dispatch(userApiSlice.endpoints.getMe.initiate());
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

export default HomePage;
