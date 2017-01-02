import React from 'react'

const Messages = ({messages}) => (
  <ul>
    {messages.map((message, index) => <li key={index} className={message.isMine ? 'is-mine' : ''}>
      <div className='author'>{message.author}</div>
      <div className='text'>{message.text}</div>
    </li>)}
  </ul>
)

export default Messages
