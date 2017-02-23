import {connect} from 'react-redux'
import {call, change} from 'redux-jet'
import connection from '../connection'
import Footer from '../components/Footer'

const mapStateToProps = state => ({
  me: state.me,
  name: state.me && state.me.name,
  photo: state.me && state.me.photo
})

const actions = {
  sendMessage: (clientId, text, name, photo) => call(connection, 'message/add', [text, clientId, name, photo])
}

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  sendMessage: text => dispatchProps.sendMessage(stateProps.me.id, text, stateProps.name, stateProps.photo)
})

export default connect(mapStateToProps, actions, mergeProps)(Footer)
