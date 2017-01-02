import React from 'react'

const NameForm = ({clients, setName}) => (
  <form className='name-form' action='javascript:' onSubmit={({target: {name}}) => setName(name.value)} >
    <input type='text' autoComplete='off' name='name' placeholder='Enter your name' autoFocus required />
    <button type='submit'>Start</button>
  </form>
)

const MessageForm = ({sendMessage}) => (
  <form className='message-form' action='javascript:' onSubmit={({target: {text}}) => {
    if (text.value) {
      sendMessage(text.value)
      text.value = ''
    }
  }}>
    <input autoComplete='off' name='text' placeholder='Enter message ...' autoFocus required />
    <button type='submit'>Send</button>
  </form>
)

const Footer = ({sendMessage, setName, name}) => (
  <footer>
    {name ? null : <NameForm setName={setName} />}
    <MessageForm sendMessage={sendMessage} />
  </footer>
)

export default Footer
