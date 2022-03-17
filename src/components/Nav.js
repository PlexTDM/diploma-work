import useMediaQuery from '@mui/material/useMediaQuery';
import { AppBar, Toolbar, Paper, Divider, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavButton from './Button';
import { useState } from 'react';
import UserIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../assets/logo.png';
import darkLogo from '../assets/logo-dark.svg';
import { useTheme } from '@mui/material/styles';
import ThemeSwitch from './ThemeSwitch';
import { useSelector } from 'react-redux';

const Nav = (props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMd = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isXs = useMediaQuery('(max-width:320px)');
  const [search, setSearch] = useState('');

  const userData = useSelector(state => state.userData);
  const { user } = userData;

  const toHome = () => {
    navigate('/');
  };

  const menuItems = [
    { name: 'Мэдээ', color: '#ffd230', type: 'news' },
    { name: 'Улс Төр', color: '#589e50', type: 'politics' },
    { name: 'Спорт', color: '#589e50', type: 'sport' },
    { name: 'Эрүүл Мэнд', color: '#0068ff', type: 'health' },
    { name: 'Технологи', color: '#002856', type: 'tech' },
  ];
  let menuItemsCount = [];
  for (let i = 0; i < menuItems.length; i++) {
    menuItemsCount.push(menuItems[i]);
    if (i === 3 && isMd) {
      break;
    }
    if (i === 2 && isSm) {
      break;
    }
    if (isXs) {
      break;
    }

  }

  const handleMore = () => {
    if (isXs) {

    }
  }

  const handleSearch = () => {
    navigate('/search/' + search);
  }

  return (
    <Paper className=''>
      <AppBar position="static" className='!m-0' color='transparent' enableColorOnDark>
        <Toolbar className='!flex !justify-center'>

          <NavButton onClick={toHome}>
            {<img src={theme.palette.mode === 'dark' ? logo : darkLogo} alt='logo' />}
          </NavButton>

          {user && user ?
            <NavButton hoverColor='#1188bb' title={!isMd ? 'Profile' : ''} onClick={() => { navigate('/profile') }}>
              <UserIcon />
            </NavButton> :
            <NavButton hoverColor='#1188bb' title={!isMd ? 'Sign In' : ''} onClick={() => { navigate('/login') }}>
              <UserIcon />
            </NavButton>
          }


          {menuItemsCount.map((val, i) => {
            return (
              <NavButton hoverColor={val.color} key={i} title={val.name} searchType={val.type}
                onClick={() => { navigate('/type/' + val.type) }}
              />
            )
          })}

          <NavButton hoverColor='whitesmoke' onClick={handleMore} title='More' />

          <div className='mx-4 relative w-max !p-0'>
            {!isSm ? <input type="text" placeholder="Search" className='search w-28 border-2 text-black pr-6' value={search} onChange={(e) => setSearch(e.target.value)}
              onKeyPress={e => {
                if (e.key !== 'Enter') return
                handleSearch()
              }}
            /> : ''}
            <IconButton style={{ color: `${!isSm ? '#000' : '#fff'}` }} className={`!p-0 !m-0 ${isSm ? '' : '!absolute right-0 !pt-[3px]'}`}
              onClick={handleSearch}
            >
              <SearchIcon />
            </IconButton>

          </div>
          {!isXs && <ThemeSwitch onMouseUp={props.ToggleTheme} />}
        </Toolbar>
      </AppBar>
      <Divider />
    </Paper>
  )
}

export default Nav