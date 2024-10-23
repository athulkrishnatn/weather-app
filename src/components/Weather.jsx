import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import humidity_icon from '../Assets/humidity.png';
import wind_icon from '../Assets/wind.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';






const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const inputRef = useRef()
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n":cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  }
  const search = async ()=>{
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      console.log(data);
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed : data.wind.speed,
        temparature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })
      
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    search("London")
  },[])

  return (
    <div className='weather'>
      {/* Search Bar Section */}
      <div className='search-bar'>
        <input ref={inputRef} type="text" placeholder='Search'  />
        <img src={search_icon} alt="Search Icon" onClick={()=>search(inputRef.current.value)} />
      </div>
      
      {/* Weather Information */}
      <div className="weather-info">
        <img src={weatherData.icon} className='weather-icon' alt="Clear Weather Icon" />
        <p className="temparature">{weatherData.temparature}</p>
        <p className="location">{weatherData.location}</p>
      </div>

      {/* Weather Data Section */}
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="Humidity Icon" />
          <div>
            <p>{weatherData.humidity} %</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="Wind Icon" />
          <div>
            <p>{weatherData.windSpeed} Km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
