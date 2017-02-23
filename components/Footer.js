import React from 'react'

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

const Footer = ({sendMessage}) => (
  <footer>
    <MessageForm sendMessage={sendMessage} />
  </footer>
)

export default Footer
