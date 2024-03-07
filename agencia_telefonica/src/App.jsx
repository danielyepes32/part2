import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Person from './components/Persons'
import Notification from './components/Notifications'


const Filter = (props) => {
  return(
    <div>
      Filter Shown With: <input value={props.newFilter}
      onChange={props.handleFilterChange}/>
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addNumbers}>
        <div>
          name: <input value={props.newName}
          onChange={props.handleNameChange}/>
        </div>
        <div>
          number: <input value={props.newNumber}
          onChange={props.handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = (props) => {
  return (
    <ul>
      {props.namesToShow.map((persons,i) =>
        <Person key={i} 
        persons={persons} 
        toggleDelete={() => props.toggleDelete(persons.id)}
        />
      )}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, []) 


  const addNumbers = (event) => {
    event.preventDefault()
    const value = newName
    let already = 0

    personService
    .getAll()
    .then(initialPersons => {
      initialPersons.map(person =>{
        if(person.name == value){
          already = 1

          if(window.confirm(person.name+' is already added to phonebook, replace the old number with a new one?')==true){
            console.log(person)

            const nameObject = {
              name: newName,
              number: newNumber
            }
          personService
            .update(person.id, nameObject)
            .then(returnedPerson => {
              console.log("sentencia retorno: ",returnedPerson)
              setPersons(persons.map(persona => persona.id !== person.id  ? persona : returnedPerson))
            }).catch(error => {
              setError(
                `Information of '${nameObject.name}' was already deleted from server`
              )
              setTimeout(() => {
                setError(null)
              }, 5000)
              setPersons(persons.filter(persona => persona.id !== person.id))
            })
          }
          console.log(already)
        }
      })

      if(already == 0){
        console.log("Dentro ")
        const nameObject = {
          name: newName,
          number: newNumber
        }
  
        personService
        .create(nameObject)
        .then(returnedName => {
          setPersons(persons.concat(returnedName))
          setNewName('')
          setNewNumber('')
          setMessage(
            `Added '${nameObject.name}' on server`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      }

    })
    console.log(already)
     
    
  }

  const toggleDelete = id => {

    const url = `http://localhost:3001/persons/${id}`
    const person = persons.find(n => n.id === id)
    if(window.confirm('Delete '+person.name+'?')==true){
      console.log(person)
    personService
      .erase(id)
      .then(returnedPerson => {
        console.log("sentencia retorno: ",returnedPerson)
        setPersons(persons.filter(n => n.id !== id))
      }).catch(error => {
        alert(
          `the person '${person.name}' was already deleted from server`
        )
        setPersons(persons.filter(n => n.id !== id))
      })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }  

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }  

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }    


  const namesToShow = persons.filter(persons =>
     persons.name.toLowerCase().includes(newFilter.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error ={error} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>Add a New</h2>

      <PersonForm 
        addNumbers={addNumbers}
        newName={newName}
        newNumber={newNumber} 
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons namesToShow={namesToShow}
      toggleDelete={toggleDelete}/>
      
    </div>
  )
}

export default App
