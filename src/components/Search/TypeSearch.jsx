import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ShowSearch from './ShowSearch';
const Search = () => {
  const { type } = useParams();
  const [searchData, setSearchData] = useState(null);
  const limit = 2;
  const api = '';
  // const api = 'http://localhost:4000';
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${api}/search?type=${type}&limit=${limit}`)
      console.log(data.count)
      setSearchData(data)
    };
    if(!searchData)fetchData();
  }, [type,searchData]);
  useEffect(() => {
    return ()=>setSearchData(null)
  }, [type]);

   return (<>
    {searchData&&<ShowSearch data={searchData.message} type={type} pagination={searchData.count} limit={limit} />}
   </>)



}
export default Search;