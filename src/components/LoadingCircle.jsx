import { CircularProgress } from '@mui/material';
const LoadingCircle = () => {
    return <div className='z-20 fixed grid content-evenly justify-evenly backdrop-brightness-50 w-screen h-screen'>

        <CircularProgress />
    </div>
}

export default LoadingCircle