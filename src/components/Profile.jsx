import { Avatar, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import ProfileMenu from './ProfileMenu';

const Profile = () => {
  const userData = useSelector(state => state.userData);
  const { user } = userData;
  
  return (
    <Paper className='w-full min-h-[calc(100vh-66px)] flex justify-center p-2 md:flex-col'>
      <div className='flex items-center flex flex-col'>
        <Avatar sx={{ width: 300, height: 300 }} src={user&&user.avatar}/>
        <Typography variant='h3' className='!mx-auto w-min !mt-4'>{user&&user.username}</Typography>
      </div>
      <div className='md:ml-2 ml-4 md:p-4 border-2 md:w-[95%]'>
        <ProfileMenu user={user}/>
      </div>
    </Paper>
  )
}

export default Profile;