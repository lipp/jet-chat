import {connect} from 'react-redux'
import {add} from 'redux-jet'
import connection from '../connection'
import uuid from 'uuid'
import Footer from '../components/Footer'

const mapStateToProps = state => ({
  disabled: !(state.me && state.me.name),
  me: state.me
})

const actions = {
  sendMessage: (clientId, text) => add(connection, 'message/#' + uuid.v1(), {postedAt: Date.now(), text, clientId})
}

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  sendMessage: text => dispatchProps.sendMessage(stateProps.me.id, text)
})

export default connect(mapStateToProps, actions, mergeProps)(Footer)
