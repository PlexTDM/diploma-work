import useMediaQuery from '@mui/material/useMediaQuery';
import { AppBar, Toolbar, Paper, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavButton from './Button';
import { useState, useContext } from 'react';
import UserIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';
// import logo from '../assets/logo-light.png';
// import darkLogo from '../assets/logo-dark.png';
import logo from '../assets/Vidia.png';
import darkLogo from '../assets/darkVidia.png';
import { useTheme } from '@mui/material/styles';
import ThemeSwitch from './ThemeSwitch';
import { UserContext } from './App';
// import { useSelector } from 'react-redux';

const Nav = (props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const isMd = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  // const isXs = useMediaQuery('(max-width:320px)');
  const [search, setSearch] = useState('');

  // const userData = useSelector(state => state.userData);
  // const { user } = userData;

  const user = useContext(UserContext);

  const toHome = () => {
    navigate('/home');
  };

  const menuItems = [
    { name: 'Улс Төр', color: '#589e50', type: 'politics' },
    { name: 'Спорт', color: '#589e50', type: 'sport' },
    { name: 'Эрүүл Мэнд', color: '#0068ff', type: 'health' },
    { name: 'Технологи', color: '#002856', type: 'tech' },
  ];
  let menuItemsCount = [];
  for (let i = 0; i < menuItems.length; i++) {
    menuItemsCount.push(menuItems[i]);
    if (i === 2 && isMd) {
      break;
    }
    if (i === 1 && isSm) {
      break;
    }
  }

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = () => {
    navigate('/search/' + search);
  }

  return (
    <Paper className=''>
      <AppBar position="static" className='!m-0' color='transparent' enableColorOnDark>
        <Toolbar className='!flex !justify-center'>

          <NavButton onClick={toHome} sx={{paddingY:'0', overflow:'hidden'}}>
            {<img src={theme.palette.mode === 'dark' ? darkLogo : logo} className='h-[66px]' alt='logo' />}
             {/* <div id="earth"></div> */}
          </NavButton>

          {user && user ?
            <NavButton hoverColor='#1188bb' title={!isMd ? 'Profile' : ''} onClick={() => { navigate('/profile') }}>
              <UserIcon />
            </NavButton> :
            <NavButton hoverColor='#1188bb' title={!isMd ? 'Sign In' : ''} onClick={() => { navigate('/login') }}>
              <UserIcon />
            </NavButton>
          }

          <Menu anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {menuItems.map((val, i) => {
              return <MenuItem key={i}>
                <NavButton noborder={true} hoverColor={val.color} title={val.name} searchType={val.type} onClick={() => { navigate('/type/' + val.type) }} />
              </MenuItem>
            })}
            <Divider />
            <MenuItem sx={{ display: 'flex', justifyContent: 'center' }}>
              <ThemeSwitch onMouseUp={props.ToggleTheme} />
            </MenuItem>
          </Menu>
          {menuItemsCount.map((val, i) => {
            return (
              <NavButton hoverColor={val.color} key={i} title={val.name} searchType={val.type}
                onClick={() => { navigate('/type/' + val.type) }}
              />
            )
          })}

          {isSm && <NavButton hoverColor='#1188bb' title='Бусад' onClick={handleClick} />}

          <div className='mx-4 relative w-max !p-0'>
            {!isSm ? <input type="text" placeholder="Хайх" className='search w-28 border-2 border-black text-black pr-6' value={search} onChange={(e) => setSearch(e.target.value)}
              onKeyPress={e => {
                if (e.key !== 'Enter') return
                handleSearch()
              }}
            /> : ''}
            <IconButton
              style={{ color: `${isSm && theme.palette.mode === 'dark' ? '#fff' : isSm && theme.palette.mode === 'light' ? '#000' : !isSm &&theme.palette.mode==='dark' ? '#000' : '#000'}` }}
              className={`!p-0 !m-0 ${isSm ? '' : '!absolute right-0 !pt-[3px]'}`}
              onClick={handleSearch}
            >
              <SearchIcon />
            </IconButton>

          </div>
          {!isSm && <ThemeSwitch onMouseUp={props.ToggleTheme} />}
        </Toolbar>
      </AppBar>
      <Divider />
    </Paper>
  )
}

export default Nav