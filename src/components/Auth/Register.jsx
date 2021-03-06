import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Paper, InputAdornment } from '@mui/material'
import {
  PersonOutlineOutlined as PersonIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  Password as PasswordIcon
} from '@mui/icons-material';
import Form from './Form';
import blueskybg from '../../assets/blueskybg.jfif';
import ErrAlert from "./ErrAlert";
import Input from './Input';
import LoadingCircle from '../LoadingCircle';
import { register } from '../features/register';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorOpen, setErrorOpen] = useState([false, null]);

  const dispatch = useDispatch();
  const registerFetch = useSelector(store => store.register);
  const { loading, data, error, status } = registerFetch;

  useEffect(() => {
    error && setErrorOpen([true, error]);
  }, [error]);

  useEffect(() => {
    return () => {
      dispatch({ type: 'register/clear' });
    };
  }, [dispatch]);


  const submitHandler = async (e) => {
    e.preventDefault();
    if (email.trim() === '' || password.trim() === '' || username.trim() === '' || number.trim() === '') {
      return setErrorOpen([true, null]);
    };
    const formData = {
      email: email,
      password: password,
      username: username,
      number: number
    }
    dispatch(register(formData));
    resetForm();
  };
  const resetForm = () => {
    setUsername('');
    setEmail('');
    setNumber('');
    setPassword('');
  };

  const closeErr = () => {
    setErrorOpen([false, null]);
    dispatch({ type: 'register/clear' });
  }

  const bgstyle = {
    backgroundImage: `url(${blueskybg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: "calc('100vh' - '66px')",
    overflow: 'hidden',
  }

  data && status === 200 && dispatch({ type: 'register/clear' });
  data && console.log(data);

  return (
    <Paper sx={bgstyle} className='h-[calc(100vh_-_68px)] w-full relative'>
      {loading && <LoadingCircle />}
      <Paper elevation={24} className={`!mx-auto ml-32 lg:ml-0 p-[1rem] lg:w-[65%] w-[30%] mt-[10%]`}>
        <Form onSubmit={submitHandler}>
          {errorOpen[0] && <ErrAlert close={closeErr} message={errorOpen[1]} />}
          {errorOpen[0] && console.log(errorOpen[1])}
          <Input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            autoComplete="username"
            placeholder="Username"
            startAdornment={
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            }
          />
          <Input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoComplete="email"
            placeholder="?????????? ????????????"
            startAdornment={
              <InputAdornment position="start">
                <MailIcon />
              </InputAdornment>
            }
          />
          <Input
            onChange={(e) => setNumber(e.target.value)}
            value={number}
            autoComplete="number"
            placeholder="Phone Number"
            type="number"
            startAdornment={
              <InputAdornment position="start">
                <PhoneIcon />
              </InputAdornment>
            }
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="new-password"
            placeholder="???????? ????"
            type="password"
            startAdornment={
              <InputAdornment position="start">
                <PasswordIcon />
              </InputAdornment>
            }
          />
          <Button variant="contained" type="submit">????????????????????</Button>
          <Link to="/login" style={{ width: 'min-content', borderBottom: '1px solid green' }}>??????????????</Link>
        </Form>
      </Paper>
    </Paper>
  );
};

export default Register;