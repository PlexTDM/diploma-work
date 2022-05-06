import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHomeArticles } from '../features/homeArticles';
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import noImage from '../../assets/no-image.png';
import 'swiper/css/bundle';
import 'swiper/css';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
import { CircularProgress } from '@mui/material';

const Slider = () => {
  const { data, loading } = useSelector(state => state.homePage);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (data.length > 0) return
    // get latest 3 seperately so it's faster
    dispatch(getHomeArticles(0));
    dispatch(getHomeArticles(1));
    dispatch(getHomeArticles(2));
    dispatch(getHomeArticles(3));
  }, [dispatch, data]);
  SwiperCore.use([Autoplay, Pagination, Navigation]);
  return (
    <div className="max-w-[500px] sm:max-w-full max-h-[400px] object-cover m-4 col-span-2 sm:col-span-3">
      {loading && <CircularProgress />}
      <Swiper autoplay={{ delay: 4000, disableOnInteraction: false }} loop navigation pagination={{ clickable: true }} className='flex items-center cursor-pointer'>
        {data?.length > 0 && data.map((item, i) => (
          <SwiperSlide key={i} onClick={() => navigate('/article/' + item._id)} className='p-4 object-cover'>
            <img src={item.poster && typeof item.poster === "string" ? item.poster : noImage} alt={item.title} className='min-w-[100%] max-h-[380px]' />
            <p className="legend">{item.title.length > 90 ? item.title.substring(0, 90) + '...' : item.title}</p>
          </SwiperSlide>
        ))}
      </Swiper >
    </div>
  )
}

export default Slider