import { CircularProgress } from '@mui/material';
const LoadingCircle = () => {
    return (
        <div className='fixed grid content-evenly justify-evenly backdrop-brightness-50 w-screen h-screen z-50'>
            <CircularProgress />
        </div>)
}

export default LoadingCircle