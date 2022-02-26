import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUsers } from '../actions/authActions';
import { Button, Paper, InputAdornment } from '@mui/material'
import { Mail as MailIcon, Password as PasswordIcon } from '@mui/icons-material';
import Form from './Form';
import Input from './Input';
import blueskybg from '../../assets/blueskybg.jfif';
import ErrAlert from './ErrAlert';

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
  const { data, status } = loginFetch;
  // const { loading, data, error } = loginFetch;

  useEffect(() => {
    const getUserFromLocalStorage = () => {
      const localData = {
        _id: data._id,
        avatar: data.avatar,
        role: data.role,
      }
      localStorage.setItem('user', JSON.stringify(localData));
    }
    const ehe = async () => {
      await setLogin(2);
      getUserFromLocalStorage();
      navigate('/home');
    }

    if (login === 1) {
      ehe();
    }
    console.log(login);

  }, [login, navigate, data]);


  const submitHandler = async (e) => {
    setLogin(0);
    e.preventDefault();
    if (email.trim() === '' || password.trim() === '') {
      return setErrorOpen(true);
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
  status && status === 200 && login === 0 && setLogin(1)
  return (
    <Paper sx={bgstyle} className='h-[89vh] w-full relative'>
      <Paper elevation={24} className={`!mx-auto ml-32 lg:ml-0 p-[1rem] lg:w-[65%] w-[30%] mt-[10%]`}>
        <Form onSubmit={submitHandler}>
          {errorOpen && <ErrAlert close={() => { setErrorOpen(false) }} />}
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