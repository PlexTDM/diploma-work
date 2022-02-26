import { useState } from 'react';
import { useTheme, Typography, IconButton } from '@mui/material';


const Button = (props) => {
  const theme = useTheme();
  const [isHover, setIsHover] = useState(false);


  return (
    <>
      <IconButton color='primary' onClick={props.onClick}
        className={`navBtn`}
        onMouseEnter={()=>setIsHover(true)}
        onMouseLeave={()=>setIsHover(false)}
        sx={[{height:'100%', borderRadius:''},isHover ? {borderBottom:`4px solid ${props.hoverColor || 'transparent'}`} : {borderBottom:'4px solid transparent'},
        theme.palette.mode === 'light' ? {borderRight:'2px solid black !important'} : {}
      ]}
      >
        {props.children}
        <Typography color="inherit" component="div" className='text-base'>
          {props.title}
        </Typography> 
      {/* <span ></span> */}
      </IconButton>
    </>
  )
}

export default Button;