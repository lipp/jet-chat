import {connect} from 'react-redux'
import {change} from 'redux-jet'
import connection from '../connection'
import Header from '../components/Header'

const mapStateToProps = state => ({
  clients: state.clients.length,
  me: state.me
})

const actions = {
  setName: (client, name) => change(connection, 'client/#' + client.id, {...client, name})
}

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  setName: name => dispatchProps.setName(stateProps.me, name)
})

export default connect(mapStateToProps, actions, mergeProps)(Header)
