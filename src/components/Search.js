import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Paper, Button } from '@mui/material';
const Search = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const [searchData, setSearchData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const {data} = await axios.get('http://localhost:4000/search?type=' + type)
      setSearchData(data.message)
      console.log(data.message)
    };
    fetchData();
  }, [type]);
  
  return <Paper className='mt-2 min-h-[85vh] m-4 flex justify-center' elevation={24}>
    {searchData && searchData.length!==0?
    searchData.map((data, i)=>{
      return <Button key={i} onMouseUp={()=>navigate('/article/'+data._id)} variant="text" className='h-min w-auto'>
        {data.title}
      </Button>
    }):<div>No data</div>}
  </Paper>;



}
export default Search;