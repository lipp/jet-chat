import React from 'react'

const Footer = ({sendMessage, disabled}) => (
  <form action='javascript:' onSubmit={({target: {text}}) => {
    sendMessage(text.value)
    text.value = ''
  }}>
    <input autoComplete='off' name='text' disabled={disabled} placeholder={disabled ? 'Please enter username above' : 'Your message'} />
  </form>
)

export default Footer
