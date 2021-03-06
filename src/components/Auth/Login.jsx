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
import { getUserData } from '../features/getUserData';
import { login } from '../features/login';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorOpen, setErrorOpen] = useState([false],null);

  const loginFetch = useSelector(state => state.login);
  const { data, error, loading } = loginFetch;

  useEffect(() => {
    if (data) {
      localStorage.setItem('user', JSON.stringify(data));
      dispatch(getUserData(data._id));
      navigate('/home');
    }
    error&&setErrorOpen([true, error]);
  }, [navigate, data, error, dispatch]);

  useEffect(() => {  
    return ()=>{
      console.log('clearing loginFetch');
      dispatch({type: 'login/clear'});
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
    dispatch(login(formData));
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
    <Paper sx={bgstyle} className='h-[calc(100vh_-_68px)] w-full relative'>
      {loading && <LoadingCircle />}
      <Paper elevation={24} className={`!mx-auto ml-32 lg:ml-0 p-[1rem] lg:w-[65%] w-[30%] mt-[10%]`}>
        <Form onSubmit={submitHandler}>
          {errorOpen[0] && <ErrAlert close={closeErr} message={errorOpen[1]} />}
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
            onChange={(e) => setPassword(e.target.value)}
            value={password} placeholder="???????? ????" type="password"
            autoComplete="current-password"
            className='my-4'
            startAdornment={
              <InputAdornment position="start">
                <PasswordIcon />
              </InputAdornment>
            }
          />
          <Button variant="contained" type="submit">??????????????</Button>
          <Link to="/register" style={{ width: 'min-content', borderBottom: '1px solid green' }}>????????????????????</Link>
        </Form>
      </Paper>
    </Paper>
  );
};

export default Login;