const List = ({ countries,toggleShow}) => {
  console.log(countries)

  if(countries.length > 10){
    return(
      <p>
        Too many matches, specify another filter
      </p>
    )
  }else if(countries.length <= 10 && countries.length != 1){
  return (
    countries.map((value, index) => (
      <li key={index}>{value}
      <button onClick={() => toggleShow(value)}> Show</button>
      </li>
    ))
  )
}
}

export default List