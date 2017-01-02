import {connect} from 'react-redux'
import {add, change} from 'redux-jet'
import connection from '../connection'
import uuid from 'uuid'
import Footer from '../components/Footer'

const mapStateToProps = state => ({
  me: state.me,
  name: state.me && state.me.name
})

const actions = {
  sendMessage: (clientId, text) => add(connection, 'message/#' + uuid.v1(), {postedAt: Date.now(), text, clientId}),
  setName: (client, name) => change(connection, 'client/#' + client.id, {...client, name})
}

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  sendMessage: text => dispatchProps.sendMessage(stateProps.me.id, text),
  setName: name => dispatchProps.setName(stateProps.me, name)
})

export default connect(mapStateToProps, actions, mergeProps)(Footer)
