import { Typography, IconButton } from '@mui/material';

const Button = props => {
  return (
    // className={`${props.noborder ? '' : 'navBtn'} h-full`}
    <>
      <IconButton color='primary' onClick={props.onClick}
        className='navBtn h-full' sx={[{ ...props.sx },{
          ':after': {backgroundColor: props.hoverColor,}
        }]}>
        {props.children}
        <Typography color="inherit" component="div" className='text-base'>
          {props.title}
        </Typography>
      </IconButton>
    </>
  )
}

export default Button;