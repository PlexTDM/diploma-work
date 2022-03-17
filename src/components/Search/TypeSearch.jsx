import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ShowSearch from './ShowSearch';
const Search = () => {
  const { type } = useParams();
  const [searchData, setSearchData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('http://localhost:4000/search?type=' + type)
      setSearchData(data.message)
    };
    fetchData();
    return ()=>setSearchData(null)
  }, [type]);

  return <ShowSearch data={searchData} />



}
export default Search;