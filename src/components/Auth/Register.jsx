import { useSelector, useDispatch } from 'react-redux';
import { registerUsers } from '../actions/authActions';
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
import { REG_RESET } from '../constants/constants';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorOpen, setErrorOpen] = useState(false);

  const dispatch = useDispatch();
  const registerFetch = useSelector(store => store.register);
  const { loading, data, error, status } = registerFetch;

  useEffect(() => {
    error && setErrorOpen(true);
  }, [error]);

  useEffect(() => {
    return () => {
      dispatch({ type: REG_RESET });
    };
  }, [dispatch]);


  const submitHandler = async (e) => {
    e.preventDefault();
    if (email.trim() === '' || password.trim() === '' || username.trim() === '' || number.trim() === '') {
      return setErrorOpen(true);
    };
    const formData = {
      email: email,
      password: password,
      username: username,
      number: number
    }
    dispatch(registerUsers(formData));
    resetForm();
  };
  const resetForm = () => {
    setUsername('');
    setEmail('');
    setNumber('');
    setPassword('');
  };

  const closeErr = () => {
    setErrorOpen(false)
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

  data && status === 200 && dispatch({ type: REG_RESET });
  data && console.log(data);

  return (
    <Paper sx={bgstyle} className='h-[89vh] w-full relative'>
      {loading && <LoadingCircle />}
      <Paper elevation={24} className={`!mx-auto ml-32 lg:ml-0 p-[1rem] lg:w-[65%] w-[30%] mt-[10%]`}>
        <Form onSubmit={submitHandler}>
          {errorOpen && <ErrAlert close={closeErr} value={error} />}
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
            placeholder="Цахим Шуудан"
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
            placeholder="Нууц Үг"
            type="password"
            startAdornment={
              <InputAdornment position="start">
                <PasswordIcon />
              </InputAdornment>
            }
          />
          <Button variant="contained" type="submit">Бүртгүүлэх</Button>
          <Link to="/login" style={{ width: 'min-content', borderBottom: '1px solid green' }}>Нэвтрэх</Link>
        </Form>
      </Paper>
    </Paper>
  );
};

export default Register;