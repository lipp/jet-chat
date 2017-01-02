import React from 'react'

const Header = ({clients, setName}) => (
  <header>
    <form action='javascript:' onSubmit={({target: {name}}) => setName(name.value)} >
      <input autoComplete='off' required name='name' placeholder='John Doe' />
    </form>
    <div>{clients <= 1 ? 'Nobody else is online' : `${clients} people online`}</div>
  </header>
)

export default Header
