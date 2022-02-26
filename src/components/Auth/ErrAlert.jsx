import { Alert, IconButton } from '@mui/material';
import Close from '@mui/icons-material/Close';

const ErrAlert = props => {
  return <Alert color='error' severity='error' action={<IconButton size='small'
    onClick={() => { props.close() }}>
    <Close fontSize="inherit" />
  </IconButton>}>{props.value ? props.value : 'Бүх талбарыг бөглөнө үү!'}</Alert>
}

export default ErrAlert;