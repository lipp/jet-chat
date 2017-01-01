import React from 'react'
import {connect} from 'react-redux'
import {add} from 'redux-jet'
import connection from '../connection'
import uuid from 'uuid'
import client from '../client'

const style = `
  input {
    width: 90%;
    margin: 0 auto;
    font-size: 0.8em;
  }
`

const Input = ({sendMessage, disabled}) => (
  <form action='javascript:' onSubmit={({target: {text}}) => {
    sendMessage(text.value)
    text.value = ''
  }}>
    <input name='text' disabled={disabled} placeholder='Your message' />
    <style jsx>{style}</style>
  </form>
)

const mapStateToProps = state => ({
  disabled: !(state.me && state.me.name)
})

const actions = {
  sendMessage: text => add(connection, 'message/#' + uuid.v1(), {createdAt: Date.now(), text, clientId: client.id})
}

export default connect(mapStateToProps, actions)(Input)
