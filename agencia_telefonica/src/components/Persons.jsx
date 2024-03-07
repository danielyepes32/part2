const Person = ({ persons,toggleDelete}) => {
    console.log(persons)
    return (
      <li>{persons.name} {persons.number}
      <button onClick={toggleDelete}>delete</button></li>
    )
  }
  
  export default Person