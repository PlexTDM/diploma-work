import useMediaQuery from '@mui/material/useMediaQuery';
import { AppBar, Toolbar, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavButton from './Button';
import { useState } from 'react';
import UserIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';
// import SearchIcon from '../assets/icon-search.svg'
import logo from '../assets/logo.png';
import darkLogo from '../assets/logo-dark.svg';
import { useTheme } from '@mui/material/styles';
import ThemeSwitch from './ThemeSwitch';

const Nav = (props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMd = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isXs = useMediaQuery('(max-width:320px)');
  const [search, setSearch] = useState('');

  const toHome = () => {
    navigate('/');
  };

  const menuItems = [
    {name: 'News',color: '#ffd230',type:'news'},
    {name: 'Спорт',color: '#589e50',type:'sport'},
    {name: 'Эрүүл Мэнд',color: '#0068ff',type:'health'},
    {name: 'Ажил Амьдрал',color: '#0052a1',type:'worklife'},
    {name: 'Аялал',color: '#ffd230',type:'travel'},
    {name: 'Технологи',color: '#002856',type:'tech'},
    {name: 'Cоёл',color: '#589e50',type:'culture'},
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

  return (
    <Paper className=''>
      <AppBar position="static" className='!m-0' color='transparent' enableColorOnDark>
        <Toolbar className='!flex !justify-center'>

          <NavButton onMouseUp={toHome}>
            {<img src={theme.palette.mode === 'dark' ? logo : darkLogo} alt='logo' />}
          </NavButton>

          <NavButton hoverColor='#1188bb' title={!isMd?'Sign In':''}>
            <UserIcon />
          </NavButton>

          {menuItemsCount.map((val, i) => {
            return (
              <NavButton hoverColor={val.color} key={i} title={val.name} searchType={val.type}
                onMouseUp={() => {navigate('/search/'+val.type)}}
              />
            )
          })}

          <NavButton hoverColor='whitesmoke' onMouseUp={handleMore} title='More'/>

          <div className='mx-4 relative w-auto !p-0'>
            {!isSm ? <input type="text" placeholder="Search" className='search w-28 border-2 text-black pr-6' value={search} onChange={(e) => setSearch(e.target.value)} 
            // style={{background: `url(${SearchIcon}) top right no-repeat`, backgroundSize: '20px 20px', stroke:'#fff'}}
            /> : ''}
            <SearchIcon style={{ color: `${!isSm ? '#000' : '#fff'}` }} className={`${isSm?'':'absolute right-0 top-0'}`} />
            
          </div>
          {!isXs && <ThemeSwitch onMouseUp={props.ToggleTheme} />}
        </Toolbar>
      </AppBar>
    </Paper>
  )
}

export default Nav