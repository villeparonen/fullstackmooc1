import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)


    useEffect(() => {
      const url = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
      console.log(url)
      const fetchData = async () => {
        try {
          const result = await axios(url);
          console.log(result.data[0])
          let countr = result.data[0]
          setCountry(countr);
        } catch(error) {
          if(error.response.status !== 404) {
            console.error(error, error.response)
          }
          setCountry("Not Found")
        }
      };
      if(name) {
          fetchData();
      }
    }, [name]);




  return country
}

const Country = ({ country }) => {

if(country === "Not Found") {
  return (
  <div>Not found</div>
  )
} else if(!country) {
  return (
  <div></div>
  )
} else {
  return (
  <div>
  <h3>{country.name} </h3>
  <div>capital {country.capital} </div>
  <div>population {country.population}</div> 
  <img src={country.flag} height='100' alt={`flag of ${country.name}`}/>  
</div>)
}

}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App