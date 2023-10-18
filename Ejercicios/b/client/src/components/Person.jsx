import React from 'react'

const Person = ({person, handleDeletePerson}) => {
  return (
    <li>
      <p>{person.name}: {person.number}</p>
      <button onClick={() => handleDeletePerson(person.id)}>delete</button>  
    </li>
  )
}

export default Person
