import React, { useState } from 'react';
const api = {
  key: '5adab46b9efc7933c8e141e043888b11',
  base: 'https://api.openweathermap.org/data/2.5/',
};
function App() {
  let [query, setQuery] = useState('');
  let [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery = '';
          console.log(result);
        });
    }
  };
  const dayBuilder = (e) => {
    let date = String(new window.Date());
    date = date.slice(3, 15);
    console.log(date);
    return `${date}`;
  };
  return (
    <div
      className={
        typeof weather.main != 'undefined'
          ? weather.main.temp > 16
            ? 'app warm'
            : 'app'
          : 'app'
      }>
      <main>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            placeholder='Search...'
          />
        </div>
        {typeof weather.main != 'undefined' ? (
          <div>
            <div className='location-box'>
              <div className='location'>
                {weather.name},{weather.sys.country}
              </div>
              <div className='date'>{dayBuilder(new Date())}</div>
            </div>
            <div className='weather-box'>
              <div className='temp'>{Math.round(weather.main.temp)}*C</div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ''
        )}
      </main>
    </div>
  );
}

export default App;
