import {connect} from 'react-redux'
import {call, change} from 'redux-jet'
import connection from '../connection'
import Footer from '../components/Footer'

const mapStateToProps = state => ({
  me: state.me,
  name: state.me && state.me.name
})

const actions = {
  sendMessage: (clientId, text, name) => call(connection, 'message/add', [text, clientId, name]),
  setName: (client, name) => change(connection, 'client/#' + client.id, {...client, name})
}

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  sendMessage: text => dispatchProps.sendMessage(stateProps.me.id, text, stateProps.name),
  setName: name => dispatchProps.setName(stateProps.me, name)
})

export default connect(mapStateToProps, actions, mergeProps)(Footer)
