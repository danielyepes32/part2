import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Countries'
import List from './components/List'


const Filter = (props) => {
  return(
    <div>
      Find Countries: <input value={props.newFilter}
      onChange={props.handleFilterChange}/>
    </div>
  )
}

const App = () => {
  // ...
  const [currency, setCurrency] = useState(null)
  const [names, setNames] = useState([null])
  const [weather,setWeather] = useState([null])
  const [geol, setGeo] = useState([null])
  const [newFilter, setNewFilter] = useState('')
  const [newCountry, setNewCountry] = useState({name: {common:""},
  capital: "",
  area: "",
  languages: []})
  const [imageUrl, setImageUrl] = useState('')
  const [imageWeather, setImageWeather] = useState('')
  const api_key = import.meta.env.VITE_SOME_KEY
// variable api_key ahora tiene el valor configurado

  useEffect(() => {
    console.log('effect run, currency is now', currency)

    // omitir si la moneda no está definida
    //if (currency) {
      console.log('fetching exchange rates...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all/`)
        .then(response => {

          const newData = response.data.map(item => (
            item.name && item.name.common ? item.name.common : null
          )).filter(commonValue => commonValue !== null);
          setNames(newData)
        })
    //}

  }, [currency])

  useEffect(() => {
    console.log('effect run, currency is now', currency)

    if (namesToFilter.length == 1) {
      console.log('fetching exchange rates...')
      console.log('last country ',namesToFilter[0])
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${namesToFilter[0]}`)
        .then(response => {

          const newData = response.data
          setNewCountry(newData)

        })
    }

  }, [newFilter]) 


  useEffect(() => {
    console.log('effect run, currency is now', currency)

    // omitir si la moneda no está definida
    if (namesToFilter.length == 1) {
      console.log('fetching exchange rates...')
      console.log('last country ',namesToFilter[0])
      axios
        .get(`https://api.openweathermap.org/geo/1.0/direct?q=${newCountry.capital}&limit=1&appid=${api_key}`)
        .then(response => {

          const newData = response.data

          const objectGeo = {
            lat:  newData.lat,
            lon:  newData.lon
          }
          setGeo(newData)

        })
    }

  }, [newCountry]) 

  useEffect(() => {
    console.log('effect run, currency is now', currency)

// Solicitud para obtener el clima actural de la zona

    if (namesToFilter.length == 1) {
      console.log('fetching exchange rates...')
      console.log('Entro a geol')
      console.log(geol)
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${geol[0].lat}&lon=${geol[0].lon}&units=metric&appid=${api_key}`)
        .then(response => {

          const newData = response.data

          const objectWheater = {
            wind:  newData.wind.speed,
            temp:  newData.main.temp,
            icon:  newData.weather[0].icon
          }
          setWeather(objectWheater)

        })
    }

  }, [geol])

  console.log("La ubicacion es: ", geol)

  console.log(geol.lat, geol.lon)

  useEffect(() => {

    if (namesToFilter.length == 1) {

    const urlImagen = newCountry.flags.png

    axios.get(urlImagen, { responseType: 'blob' })
    .then(response => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result;
        setImageUrl(dataUrl);
      };
      reader.readAsDataURL(new Blob([response.data]));
    })
    .catch(error => console.error('Error al obtener la imagen:', error));
    }
  }, [newCountry]) 

  useEffect(() => {

    if (namesToFilter.length == 1) {


      console.log('clima es:', weather)
    const urlImagen = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`

    axios.get(urlImagen, { responseType: 'blob' })
    .then(response => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result;
        setImageWeather(dataUrl);
      };
      reader.readAsDataURL(new Blob([response.data]));
    })
    .catch(error => console.error('Error al obtener la imagen:', error));
    }
  }, [weather])   

  console.log(names)
  console.log(newCountry)

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }    

  let namesToFilter = names.filter(value =>
    value && value.toLowerCase().includes(newFilter.toLowerCase())
  )
    const found = namesToFilter.length == 1
    ? 1
    : 0

    const abreviaturasIdiomas = Object.values(newCountry.languages);

    const toggleShow = elemento => {
      console.log(elemento)

      namesToFilter = []

      namesToFilter[0] = [elemento]
      setNewFilter(elemento)
      console.log(newCountry)

    }

  return(
    <div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <List 
        countries={namesToFilter} 
        toggleShow={toggleShow}
        />

      <Country name={newCountry.name.common} 
      capital={newCountry.capital}
      area={newCountry.area}
      languages={abreviaturasIdiomas}
      found={found}
      img = {imageUrl}
      wheater={weather}
      imgWeather={imageWeather}/>

    </div>
    
  )
}

export default App
