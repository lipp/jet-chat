import React from 'react'
import {connect} from 'react-redux'
import client from '../client'

const style = `
  ul {
    list-style: none;
    width: 500px;
  }
  li {
    margin-top: 1em;
    margin-bottom: 1em;
    border-radius: 3px;
    padding: 1em;
    background: #f1f1f1;
    width: 80%;
  }
  li.is-mine {
    background: #333;
    color: white;
    margin-left: 20%;
  }
  li .author {
    font-size: 0.8em;
    font-weight: bold;
  }
`

const Messages = ({messages}) => (
  <ul>
    {messages.map((message, index) => <li key={index} className={message.isMine ? 'is-mine' : ''}>
      <div className='author'>{message.author}</div>
      <div className='text'>{message.text}</div>
    </li>)}
    <style jsx>{style}</style>
  </ul>
)

const mapStateToProps = state => ({
  messages: state.messages.map(message => {
    const author = state.clients.find(client => client.value.id === message.value.clientId)
    return {
      text: message.value.text,
      author: author ? (author.value.name || author.value.id) : '',
      isMine: message.value.clientId === client.id
    }
  })
})

export default connect(mapStateToProps)(Messages)
