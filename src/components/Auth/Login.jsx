import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUsers } from '../actions/authActions';
import { Button, Paper, InputAdornment } from '@mui/material'
import { Mail as MailIcon, Password as PasswordIcon } from '@mui/icons-material';
import Form from './Form';
import Input from './Input';
import LoadingCircle from '../LoadingCircle';
import blueskybg from '../../assets/blueskybg.jfif';
import ErrAlert from './ErrAlert';
import { LOGIN_RESET } from '../constants/constants';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorOpen, setErrorOpen] = useState(false);
  const [login, setLogin] = useState(999);
  // login === 0 ? 'will check'
  // login === 1 ? 'logged in'
  // login === 2 ? 'redirected'

  const loginFetch = useSelector(state => state.login);
  const { data, status, error, loading } = loginFetch;

  useEffect(() => {
    const ehe = async () => {
      await setLogin(2);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/home');
      dispatch({type: LOGIN_RESET});
    }

    if (login === 1) {
      ehe();
    }
    error && setErrorOpen(true);

  }, [login, navigate, data, error, dispatch]);


  const submitHandler = async (e) => {
    e.preventDefault();
    if (email.trim() === '' || password.trim() === '') {
      setErrorOpen(true);
      return
    };
    const formData = {
      email: email,
      password: password
    }
    dispatch(loginUsers(formData));
    resetForm();
    setLogin(0);
  };
  const resetForm = () => {
    setEmail('');
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

  data && console.log(data);
  status && status === 200 && login === 0 && setLogin(1);
  return (
    <Paper sx={bgstyle} className='h-[89vh] w-full relative'>
      <Paper elevation={24} className={`!mx-auto ml-32 lg:ml-0 p-[1rem] lg:w-[65%] w-[30%] mt-[10%]`}>
        <Form onSubmit={submitHandler}>
          {errorOpen && <ErrAlert close={closeErr} value={error} />}
          {loading && <LoadingCircle />}
          <Input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email"
            placeholder="Цахим Шуудан"
            startAdornment={
              <InputAdornment position="start">
                <MailIcon />
              </InputAdornment>
            }
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            value={password} placeholder="Нууц Үг" type="password"
            className='my-4'
            startAdornment={
              <InputAdornment position="start">
                <PasswordIcon />
              </InputAdornment>
            }
          />
          <Button variant="contained" type="submit">Нэвтрэх</Button>
          <Link to="/register" style={{ width: 'min-content', borderBottom: '1px solid green' }}>Бүртгүүлэх</Link>
        </Form>
      </Paper>
    </Paper>
  );
};

export default Login;