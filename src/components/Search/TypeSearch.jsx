import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ShowSearch from './ShowSearch';
const Search = () => {
  const { type } = useParams();
  const [searchData, setSearchData] = useState(null);
  const limit = 2;
  useEffect(() => {
    const fetchData = async () => {
      const api = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';
      const { data } = await axios.get(`${api}/search?type=${type}&limit=${limit}&project=title,poster,body,date`);
      setSearchData(data)
    };
    if (!searchData) fetchData();
  }, [type, searchData]);
  useEffect(() => {
    return () => setSearchData(null)
  }, [type]);

  return (<>
    {searchData && <ShowSearch data={searchData.message} type={type} pagination={searchData.count} limit={limit} />}
  </>)



}
export default Search;