import React from 'react'

const Form = ({handleChange, handleClickAdd}) => {
  return (
    <form>
    <div>
      name: <input name='name'  onChange={handleChange} />
    </div>
    <div>
      number: <input  name='phone'  onChange={handleChange}/>
    </div>
    <div>
      <button onClick={handleClickAdd}>add</button>
    </div>
  </form>
  )
}

export default Form
