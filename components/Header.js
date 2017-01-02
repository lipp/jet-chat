import React from 'react'

const Header = ({clients, name}) => (
  <header>
    <span>{name ? `Hi ${name} | ` : ''}</span>
    <span>{`${clients} people online`}</span>
  </header>
)

export default Header
