import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ShowSearch from './ShowSearch';
const Search = () => {
  let { type, q } = useParams();
  const [searchData, setSearchData] = useState(null);
  const api = '';
  // const api = 'http://localhost:4000';
  
  if(!type || type==='all') type = '';
  if(!q || q==='all') q = '';
  useEffect(() => {
    const fetchData = async () => {
      console.log(`${api}/search?type=${type}&q=${q}`)
      const {data} = await axios.get(`${api}/search?type=${type}&q=${q}`)
      setSearchData(data)
    };
    fetchData();
  }, [type, q]);
  
  return <ShowSearch data={searchData.message} type={type} pagination={searchData.count}/>



}
export default Search;