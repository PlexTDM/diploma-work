import { Avatar, Stack, CircularProgress, Pagination, Dialog, TextField, Button, MenuItem } from '@mui/material';
import { GET_USERS_RESET, UPDATE_USERS_RESET } from '../constants/constants';
import withReactContent from 'sweetalert2-react-content';
import { useSelector, useDispatch } from 'react-redux';
import { updateUsers } from '../actions/authActions';
import { getUsers } from '../actions/userActions';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Modal = props => {
  const { open, close, user } = props;
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [number, setNumber] = useState(user.number);
  const [password, setPassword] = useState('');//user.password
  const [avatar, setAvatar] = useState(user.avatar);
  const [role, setRole] = useState(user.role);
  const dispatch = useDispatch();
  const response = useSelector(state => state.updateUsers);
  const { loading, data } = response;

  const swal = withReactContent(Swal);

  useEffect(() => {
    if (!data) return
    swal.fire({
      title: 'User updated successfully',
      text: data.message,
      icon: 'success',
      confirmButtonText: 'OK'
    })
    .then(() => {
      dispatch({ type: UPDATE_USERS_RESET });
    })
  },[data, swal, dispatch])

  const toBase64 = e => {
    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result);
    }
    reader.readAsDataURL(e.target.files[0]);
  };

  const update = () => {
    if (username.trim() === '' ||
      email.trim() === '' ||
      number.trim() === '' ||
      password.trim() === '' ||
      role === '') return swal.fire('All fields are required', '', 'error');

    const formData = {
      username: username,
      email: email,
      number: number,
      password: password || user.password,
      avatar: avatar,
      role: role
    }
    dispatch(updateUsers(user._id, formData))
  }

  // TODO: faster data retrieving and fetching on click modal
  return (
    <Dialog open={open} onClose={close}
      className='flex justify-center items-center !z-[5]'>
      <Stack sx={{ bgcolor: '#424242', minWidth: '50%', p: 4 }} direction='row'>
        {loading && <CircularProgress />}
        <Stack direction='column' spacing={2}>
          <Avatar src={avatar} sx={{ width: 256, height: 256 }} />
          <Button variant="contained" component="label">Upload File
            <input type="file" hidden accept="image/*" onChange={toBase64} />
          </Button>
        </Stack>
        <Stack direction='column' className='ml-4' spacing={2}>
          <TextField sx={{ color: 'text.primary' }} value={username} label='Username' required
            onChange={e => { setUsername(e.target.value) }} />
          <TextField sx={{ color: 'text.primary' }} value={email} label='Email' required
            onChange={e => { setEmail(e.target.value) }} />
          <TextField sx={{ color: 'text.primary' }} value={number} label='Number' required
            onChange={e => { setNumber(e.target.value) }} />
          <TextField sx={{ color: 'text.primary' }} value={password} label='Password' required
            onChange={e => { setPassword(e.target.value) }} />

          <TextField
            value={role}
            select required
            label='Role'
            color="secondary"
            onChange={e => setRole(e.target.value)}>
            <MenuItem value="member">member</MenuItem>
            <MenuItem value="writer">writer</MenuItem>
            <MenuItem value="admin">admin</MenuItem>
          </TextField>
          <Button variant="contained" onClick={update}>Update</Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

const Admin = () => {

  const dispatch = useDispatch();
  const usersData = useSelector(state => state.getUsers);
  const { users, loading, count } = usersData;
  const center = 'flex items-center ';
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(0);
  const handlePage = (e, val) => {
    dispatch({ type: GET_USERS_RESET });
    dispatch(getUsers(val - 1));
    setPage(val);
  }
  const close = () => {
    setOpen(0);
  }
  const openM = id => {
    setOpen(id);
  }
  useEffect(() => {
    dispatch(getUsers(0));
  }, [dispatch])

  return (
    <Stack spacing={2}>

      {loading && !users && <CircularProgress />}
      {users && users.map(user => {
        return (
          <Stack key={user._id}>
            <Stack direction='row' spacing={1} onClick={() => { openM(user._id) }} className='cursor-pointer'>
              <Avatar src={user.avatar} />
              <div className={center}>{user.username}</div>
              <div className={center}>{user.email}</div>
            </Stack>
            <Modal open={open === user._id} close={close} user={user} />
          </Stack>
        )
      })}

      <Pagination count={Math.ceil(count / 5) || 1} page={page} variant="outlined" shape="rounded" onChange={handlePage} />
    </Stack>
  )

}
export default Admin;