import { useState } from 'react';
import { Typography, IconButton } from '@mui/material';

const Button = props => {
  const [isHover, setIsHover] = useState(false);

  return (
    <>
      <IconButton color='primary' onClick={props.onClick}
        className={props.noborder ? '' : 'navBtn'}
        onMouseEnter={()=>setIsHover(true)}
        onMouseLeave={()=>setIsHover(false)}
        sx={[{height:'100%', borderRadius:''},isHover ? {borderBottom:`4px solid ${props.hoverColor || 'transparent'}`} : {borderBottom:'4px solid transparent'},
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