import React from 'react'

class Messages extends React.Component {

  componentDidUpdate () {
    window.scrollTo(0, document.body.scrollHeight)
  }

  render () {
    const messages = this.props.messages
    return (
      <ul>
        {messages.map((message, index) => <li key={index} className={message.isMine ? 'is-mine' : ''}>
          <div className='author'>{message.author}</div>
          <div className='text'>{message.text}</div>
        </li>)}
      </ul>
    )
  }
}

export default Messages
