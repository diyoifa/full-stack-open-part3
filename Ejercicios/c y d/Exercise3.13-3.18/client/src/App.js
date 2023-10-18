import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'
import SuccesNotificaction from './components/SuccesNotificaction'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState([])
  const [showAll, setShowAll] = useState(true);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  useEffect(() => {
    personsService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])

  const filterPersons = (event) => {
    setFilter(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }
  const showFiltered = () => { setShowAll(!showAll) }

  const handleDeletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService.deletePerson(id)
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  const handleClickAdd = (event) => {
    event.preventDefault();
    const newPersonObject = {
      name: newPerson.name,
      number: newPerson.phone
    };
    console.log("🚀 ~ file: App.js:154 ~ handleClickAdd ~ newPersonObject:", newPersonObject);

    let existingPerson = persons.find((person) => {
      return person.name.toLowerCase() === newPerson.name.toLowerCase();
    });
    console.log("🚀 ~ file: App.js:574 ~ handleClickAdd ~ existingPerson:", existingPerson);

    if (existingPerson) {
      const confirmUpdate = window.confirm(`${newPerson.name} ya existe. ¿Quieres modificar el número de teléfono?`);
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newPerson.phone };
        personsService.update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            const updatedPersons = persons.map((person) =>
              person.id === returnedPerson.id ? returnedPerson : person
            );
            setPersons(updatedPersons);
            setSuccessMessage(`Updated ${returnedPerson.name}`)
            setTimeout(() => {
              setSuccessMessage(null)
            },5000)

          })
          .catch((error) => {
            setErrorMessage(
              `Person was already removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          });
      }
    } else {
      personsService.create(newPersonObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setSuccessMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch((error) => {
          // Handle error when creating
          console.log(error.response.data);
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        });
    }
    setNewPerson({ name: '', phone: '' });
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewPerson({ ...newPerson, [name]: value });
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} />
      <SuccesNotificaction message={successMessage}/>
      <div>
        <Filter persons={persons} setFilter={setFilter} filterPersons={filterPersons} />
        <button onClick={showFiltered}>{showAll ? 'show filtered' : 'show all'}</button>
      </div>
      <h2>ADD a New</h2>
      <Form newPerson={newPerson} handleChange={handleChange} handleClickAdd={handleClickAdd} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} showAll={showAll} handleDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App




