import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Paper, InputAdornment } from '@mui/material'
import { Mail as MailIcon, Password as PasswordIcon } from '@mui/icons-material';
import Form from './Form';
import Input from './Input';
import LoadingCircle from '../LoadingCircle';
import blueskybg from '../../assets/blueskybg.jfif';
import ErrAlert from './ErrAlert';
import { LOGIN_RESET } from '../constants/constants';
import { getUserData } from '../actions/userActions';
import { loginUsers } from '../actions/authActions';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorOpen, setErrorOpen] = useState([false],null);

  const loginFetch = useSelector(state => state.login);
  const { data, error, loading } = loginFetch;

  useEffect(() => {
    const ehe = async () => {
      localStorage.setItem('user', JSON.stringify(data.user));
      dispatch(getUserData(data.user._id));
      navigate('/home');
    }

    if (data) {
      ehe();
    }
    error&&setErrorOpen([true, error]);
  }, [navigate, data, error, dispatch]);
  useEffect(() => {
    
    return ()=>{
      dispatch({type: LOGIN_RESET});
    }
  }, [dispatch]);


  const submitHandler = async (e) => {
    e.preventDefault();
    if (email.trim() === '' || password.trim() === '') {
      setErrorOpen([true,null]);
      return
    };
    const formData = {
      email: email,
      password: password
    }
    dispatch(loginUsers(formData));
    resetForm();
  };
  const resetForm = () => {
    setEmail('');
    setPassword('');
  };
  const closeErr = () => {
    setErrorOpen([false,null]);
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
  return (
    <Paper sx={bgstyle} className='h-[89vh] w-full relative'>
      {loading && <LoadingCircle />}
      <Paper elevation={24} className={`!mx-auto ml-32 lg:ml-0 p-[1rem] lg:w-[65%] w-[30%] mt-[10%]`}>
        <Form onSubmit={submitHandler}>
          {errorOpen[0] && <ErrAlert close={closeErr} message={errorOpen[1]} />}
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
            onChange={(e) => setPassword(e.target.value)}
            value={password} placeholder="Нууц Үг" type="password"
            autoComplete="current-password"
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