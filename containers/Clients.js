import React from 'react'
import {connect} from 'react-redux'
import {change} from 'redux-jet'
import client from '../client'
import connection from '../connection'

const style = `
  header {
    padding: 1em;
    border-bottom: 1px solid lightgray;
  }
`

const Clients = ({clients, setName}) => (
  <header>
    <form action='javascript:' onSubmit={({target: {name}}) => setName(name.value)} >
      <input required name='name' placeholder='John Doe' />
    </form>
    <div>{clients === 1 ? 'Sorry, nobody else is online' : `${clients} people online`}</div>
    <style jsx>{style}</style>
  </header>
)

const mapStateToProps = state => ({
  clients: state.clients.length
})

const actions = {
  setName: name => change(connection, 'client/#' + client.id, {...client, name})
}

export default connect(mapStateToProps, actions)(Clients)
