import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";
import { getHomeArticles } from "./actions/userActions";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const HomePage = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const homePageData = useSelector(state => state.homePage);
  const { data } = homePageData;
  useEffect(() => {
    if (data) return
    dispatch(getHomeArticles());
  }, [data, dispatch]);
  return (
    <Paper sx={{ width: '100%', height: 'calc(100vh - 68px)' }} className='flex justify-center'>
      {data && 
        <div className="w-1/2">
          <Carousel
            autoPlay interval={5000} infiniteLoop
          >
            <div>
              <img src={data[0].poster} alt={data[0].title}/>
              <div dangerouslySetInnerHTML={{__html:data[0].longTitle}}></div>
            </div>
            <div>
              <img src={data[1].poster} alt={data[1].title}/>
              <div dangerouslySetInnerHTML={{__html:data[1].longTitle}}></div>
            </div>
          </Carousel>
        </div>

      }
    </Paper>
  )
}

export default HomePage;
