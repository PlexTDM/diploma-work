import useFetch from "../hooks/useFetch";

const Weather = () => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=47.94909925&lon=107.02225913456641&appid=35fe087bcd9090205a54aaab58e53197&units=metric`;
  const [res] = useFetch(url);
  const now = new Date();
  const dayArr = ['Ням', 'Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба'];
  const day = dayArr[now.getDay()];
  const monthArr = ['Нэгдүгээр сар', 'Хоёрдугаар сар', 'Гуравдугаар сар', 'Дөрөвдүгээр сар', 'Тавдугаар сар', 'Зургаадугаар сар', 'Долоодугаар сар', 'Наймдугаар сар', 'Есдүгээр сар', 'Аравдугаар сар', 'Арваннэгдүгээр сар', 'Арванхоёрдугаар сар'];
  const month = monthArr[now.getMonth()];
  const date = now.getDate();
  

  return (
    <>
      <div className="col-span-1 sm:col-span-0 sm:hidden">
        <span className='text-xl'>Улаанбаатар </span><br/>
        <span className="opacity-70">{month}, {date}, {day}</span>
        <div className="items-center">
          {res &&  (
              <div className='flex flex-col items-center mr-2'>
                {/* <p>Шөнөдөө {res.main.temp.night}°C</p> */}
                <p className='text-xs'>{res.weather.main}</p>
                <img alt={res.weather[0].main} src={`http://openweathermap.org/img/wn/${res.weather[0].icon}.png`} className='w-min' />
                <p className='text-lg'>{res.main.temp}°C</p>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default Weather;