import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  async function getWeather() {
    if (city.trim() === "") {
      setError("Please enter a city name");
      setWeather(null);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      setWeather(data);
      setError("");
    } catch (error) {
      setWeather(null);
      setError("City not found. Please try again.");
    }
    setLoading(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      getWeather();
    }
  }
  return (
    <div className="app">
      <div className="weather-container">
        <div className="header">
          <h1>Weather App</h1>
          <p>Check the current weather in any city</p>
        </div>
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={getWeather}>
            Search
          </button>
        </div>
        {loading && (
          <div className="message">
            <p>Getting weather information...</p>
          </div>
        )}
        {error && (
          <div className="error">
            <p>{error}</p>
          </div>
        )}
        {weather && !loading && (
          <div className="weather-card">
            <div className="location">
              <h2>
                {weather.name}, {weather.sys.country}
              </h2>
            </div>
            <img
              className="weather-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <h3 className="temperature">
              {Math.round(weather.main.temp)}°C
            </h3>
            <p className="condition">
              {weather.weather[0].description}
            </p>
            <div className="details">
              <div className="detail-box">
                <span>Feels Like</span>
                <strong>
                  {Math.round(weather.main.feels_like)}°C
                </strong>
              </div>
              <div className="detail-box">
                <span>Humidity</span>
                <strong>
                  {weather.main.humidity}%
                </strong>
              </div>
              <div className="detail-box">
                <span>Wind</span>
                <strong>
                  {weather.wind.speed} m/s
                </strong>
              </div>
            </div>
          </div>
        )}
        {!weather && !loading && !error && (
          <div className="welcome">
            <p>Enter a city to see its weather</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;

