const Country = ({ name,capital,area, languages, found, img, wheater, imgWeather}) => {
  console.log("country")

if (found == 0){
  console.log("dentro")
    return null
}else if(found == 1){
  console.log("country 1")
    return (
    <div>
        <h1>{name}</h1>
        <p>Capital: {capital}</p>
        <p>Area: {area}</p>
        <h3>Languages</h3>
        {languages.map((language, index) => (
        <li key={index}>{language}</li>
      ))}
      <img src={img} alt="Imagen desde Internet" />
      <h2>Wheater in {capital}</h2>
      <p>Temperature: {wheater.temp} Celsius</p>
      <img src={imgWeather} alt="Imagen desde Internet" />
      <p>Wind: {wheater.wind} km/h</p>
    </div>
    )
  }
} 
  
  export default Country