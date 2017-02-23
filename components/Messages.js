import React from 'react'

const Message = ({message}) => (
  <li key={message.id} className={message.isMine ? 'is-mine' : ''}>
    <div className='author'>
      <img src={message.avatar} />
      <span>{message.author}</span>
    </div>
    <div className='text'>{message.text}</div>
  </li>
)

class Messages extends React.Component {

  componentDidUpdate () {
    window.scrollTo(0, document.body.scrollHeight)
  }

  render () {
    const messages = this.props.messages
    return (
      <ul>
        {messages.map(message => <Message key={message.id} message={message} />)}
      </ul>
    )
  }
}

export default Messages
