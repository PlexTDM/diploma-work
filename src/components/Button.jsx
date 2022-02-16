import { useState } from 'react';
import { useTheme, Typography, IconButton } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';


const Button = (props) => {
  const theme = useTheme();
  const [isHover, setIsHover] = useState(false);
  const isSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <>
      <IconButton color='primary' onMouseUp={props.onMouseUp}
        className={`navBtn`}
        onMouseEnter={()=>setIsHover(true)}
        onMouseLeave={()=>setIsHover(false)}
        sx={[{height:'100%', borderRadius:''},isHover ? {borderBottom:`4px solid ${props.hoverColor || 'transparent'}`} : {borderBottom:'4px solid transparent'},
        theme.palette.mode === 'light' ? {borderRight:'2px solid black !important'} : {}
      ]}
      >
        {props.children}
        <Typography color="inherit" component="div" sx={{ fontSize: isSm?'2vw':'1.2vw'}}>
          {props.title}
        </Typography> 
      {/* <span ></span> */}
      </IconButton>
    </>
  )
}

export default Button;