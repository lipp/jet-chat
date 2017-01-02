/* globals localStorage */
import {createStore, applyMiddleware, combineReducers} from 'redux'
import {sorted, get, fetch, add, single} from 'redux-jet'
import thunk from 'redux-thunk'
import connection from './connection'
import uuid from 'uuid'

const clientsQuery = {
  path: {startsWith: 'client/#'},
  sort: {byValueField: {joinedAt: 'number'}, from: 1, to: 1000}
}

const messagesQuery = {
  path: {startsWith: 'message/#'},
  sort: {byValueField: {postedAt: 'number'}, descending: true, from: 1, to: 30}
}

const meQuery = {
  path: {equals: 'client/#'}
}

const reducer = initialState => combineReducers({
  clients: sorted('clients', initialState ? initialState.clients : []),
  messages: sorted('messages', initialState ? initialState.messages : []),
  me: single('me', {})
})

export default (initialState) => {
  const store = createStore(reducer(initialState), applyMiddleware(thunk))

  if (initialState) {
    store.resume = () => {
      const id = localStorage.clientId || uuid.v1()
      const name = localStorage.clientName
      console.log(name, id)
      add(connection, 'client/#' + id, {joinedAt: Date.now(), id, name})(store.dispatch)
      meQuery.path.equals += id
      fetch(connection, meQuery, 'me')(store.dispatch)
      fetch(connection, clientsQuery, 'clients')(store.dispatch)
      fetch(connection, messagesQuery, 'messages')(store.dispatch)
    }

    store.subscribe(() => {
      const state = store.getState()
      if (state.me) {
        localStorage.clientId = state.me.id
        localStorage.clientName = state.me.name
      }
    })
  } else {
    store.getInitialState = () => {
      return Promise.all([
        get(connection, clientsQuery, 'clients')(store.dispatch),
        get(connection, messagesQuery, 'messages')(store.dispatch)
      ]).then(() => store.getState())
    }
  }
  return store
}
