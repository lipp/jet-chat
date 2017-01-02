import {connect} from 'react-redux'
import Header from '../components/Header'

const mapStateToProps = state => ({
  clients: state.clients.length,
  name: state.me ? state.me.name : ''
})

export default connect(mapStateToProps)(Header)
