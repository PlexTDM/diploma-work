import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'

const One = () => {
    const { id } = useParams();
    const [article, setArticle] = useState('')

    useEffect(() => {
        const fetchData = async () => {
          const {data} = await axios.get('http://localhost:4000/idsearch/'+id)
          setArticle(data.message[0].body)
          console.log(data);
        };
        fetchData();
    }, [id])

    return (
        <div className='article'>
            <div className='articleBody w-[80%]'
                dangerouslySetInnerHTML={{ __html: article }}
            ></div>
            {/* <span className="info">
          <p className="author">By: Tengis</p>
          <p className="date">Jan 18 2022</p>
        </span> */}
        </div>
    )
}
export default One;