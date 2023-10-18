import React from 'react'
import Person from './Person'
const Persons = ({persons, filter, showAll, handleDeletePerson}) => {
  return (
    <ul>
        {
          showAll ? persons.map(person => <Person key={person.name} person={person} handleDeletePerson={handleDeletePerson} />) 
          : filter.map(person => <Person key={person.name} person={person} handleDeletePerson={handleDeletePerson} />)
        }
      </ul>
  )
}

export default Persons
