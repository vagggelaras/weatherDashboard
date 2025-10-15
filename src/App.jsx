import { useState, useEffect } from 'react'
import LeftComponent from "../components/LeftComponent.jsx"
import RightComponent from "../components/RightComponent.jsx"
import './App.css'

export default function App() {

  const [isLoading, setIsLoading] = useState(true)

  //left component state object
  const [weatherData, setWeatherData] = useState({
    city: null,
    temperature: null,
    weather: null,
    weatherIcon: null,
    maxTemp: null,
    minTemp: null
  })

  //right component state object
  const [forecastData, setForecastData] = useState({
    dt: null,
    temps24H: null
  })

  //highlights state object
  const [highlights, setHighlights] = useState({
    uv: null,
    windSpeed: null,
    sunRise: null,
    sunSet: null,
    visibility: null,
    airQuality: null
  })

  useEffect(() => {
    getLocation();
  }, [])

  function formatTime(timestamp) {
    const date = new Date(timestamp * 1000)
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error)
    } else {
      console.log("Geolocation is not supported by this browser.")
      setIsLoading(false)
    }

    async function success(position) {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
      const { latitude, longitude } = position.coords

      try {
        //parallel fetching apis
        const [weatherRes, meteoRes, airRes] = await Promise.all([
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`),
          fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&forecast_days=1&current=uv_index`),
          fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        ])
        const [data, meteoData, airData] = await Promise.all([
          weatherRes.json(),
          meteoRes.json(),
          airRes.json()
        ])

        // Set States
        const temps = meteoData.hourly.temperature_2m
        const maxTemp = Math.max(...temps)
        const minTemp = Math.min(...temps)

        setWeatherData({
          city: data.name,
          temperature: data.main.temp,
          weather: data.weather[0].description,
          weatherIcon: data.weather[0].icon,
          maxTemp: maxTemp, 
          minTemp: minTemp 
        })

        setForecastData({
          dt: data.dt,
          temps24H: meteoData.hourly.temperature_2m
        })

        setHighlights({
          uv: meteoData.current.uv_index,
          windSpeed: data.wind.speed,
          sunRise: formatTime(data.sys.sunrise),
          sunSet: formatTime(data.sys.sunset),
          visibility: data.visibility / 1000,
          airQuality: airData.list[0].main.aqi
        })

        setIsLoading(false) // stop loading -> success

      } catch (err) {
        console.error("Error fetching weather data:", err)
        setIsLoading(false)
      }
    }

    function error() {
      alert("Sorry, no position available.")
      setIsLoading(false) // stop loading -> error
    }
  }

  const highlightLabels = {
    uv: 'UV Index',
    windSpeed: 'Wind Speed',
    sunRise: 'Sunrise',
    visibility: 'Visibility',
    airQuality: 'Air Quality',
    sunSet: 'Sunset'
  }

  // Loading screen
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading weather data...</p>
      </div>
    )
  }

  return (
    <main>
      <LeftComponent
        city={weatherData.city}
        temperature={weatherData.temperature}
        weatherDescription={weatherData.weather}
        weatherIcon={weatherData.weatherIcon}
        maxTemp={weatherData.maxTemp}
        minTemp={weatherData.minTemp}
      />
      <RightComponent
        dt={forecastData.dt}
        temps24H={forecastData.temps24H}
        highlights={highlights}
        highlightLabels={highlightLabels}
      />
    </main>
  )
}