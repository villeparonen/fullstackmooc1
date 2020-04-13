import React, { useState, useEffect } from 'react'
import axios from 'axios'
import "./App.css";


const ShowCountryInfo = ({ selectedCountries }) => {
  if (selectedCountries.length === 1 && selectedCountries[0].name.length > 0) {
    return (
      <div>
        <h2>{selectedCountries[0].name}</h2>
        <h3>Population: {selectedCountries[0].population}</h3>
        <h3>Capital: {selectedCountries[0].capital}</h3>
        <h2>Spoken languages:</h2>
        <ul>
          {
            selectedCountries[0].languages.map((lang, c) => <li key={c}>{lang.name}</li>)
          }
        </ul>
        <h3><img src={selectedCountries[0].flag} className="flagPhoto" alt="flag" /></h3>
      </div>
    )
  } else {
    return (<div></div>)
  }
}

const CountrySelection = ({ country, index, selectCountry }) => (
  <div><h3>{country.name} <button onClick={() => selectCountry(country.name)}><i>Show</i></button></h3></div>
)



const Showlist = ({ selectedCountries, selectCountry }) => {
  if (selectedCountries.length > 1 && selectedCountries.length <= 10) {
    return (
      <div>
        {
          selectedCountries.map((c, i) => <CountrySelection country={c} key={i} selectCountry={selectCountry} />)
        }
      </div>
    )
  } else {
    return null
  }
}

const Header = ({ text }) => (
  <div>
    <h3>{text}</h3>
  </div>
)

const ShowWeather = ({ selectedCountries, fetchUrl }) => {
  const [weather, setWeather] = useState([])
  let city = selectedCountries[0].capital
  useEffect(() => {
    axios
      .get(fetchUrl)
      .then(response => {
        setWeather(response.data)
      })
  }, [fetchUrl])
  if (weather.current && selectedCountries.length === 1) {
    return (
      <div>
        <h2>Weather in {city}</h2>
        <p>Temperature: {weather.current.temperature}</p>
        <img src={weather.current.weather_icons[0]} className="flagPhoto" alt="flag" />
        <p>Wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
      </div>
    )
  } else {
    return null
  }
}

const ShowMessage = ({ selectedCountries, message }) => {
  if (selectedCountries.length > 10) {
    return (
      <h3>{message}</h3>
    )
  } else {
    return null
  }
}

const FindCountries = ({ valueHandler }) => (
  <form>
    Find countries: <input onChange={valueHandler} />
  </form>
)

const App = () => {
  const [countries, setCountries] = useState([])
  const [selectedCountries, setSelectedCountries] = useState([{
    name: "",
    capital: "",
    population: "",
    languages: []
  }])
  const [fetchUrl, setFetchUrl] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const valueHandler = (event) => {
    let filtered = countries.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase()))
    if (filtered.length === 1) {
      setFetchUrl(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_NOT_SECRET_CODE}&query=${filtered[0].capital}`)
    }
    setSelectedCountries(filtered)
  }

  const selectCountry = (countryn) => {
    let selectedCountry = countries.filter(country => country.name.toLowerCase().includes(countryn.toLowerCase()))
    setSelectedCountries(selectedCountry)
    setFetchUrl(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_NOT_SECRET_CODE}&query=${selectedCountry[0].capital}`)
  }

  return (
    <div>
      <Header text={"Information of countries"} />
      <FindCountries valueHandler={valueHandler} />
      <ShowMessage selectedCountries={selectedCountries} message={"Too many matches, specify another filter"} />
      <Showlist selectedCountries={selectedCountries} selectCountry={selectCountry} />
      <ShowCountryInfo selectedCountries={selectedCountries} />
      <ShowWeather selectedCountries={selectedCountries} fetchUrl={fetchUrl} />
    </div>
  )

}

export default App;
