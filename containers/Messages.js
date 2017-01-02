import {connect} from 'react-redux'
import Messages from '../components/Messages'

const mapStateToProps = ({clients, messages, me = {}}) => ({
  messages: messages.map(message => {
    const author = clients.find(client => client.value.id === message.value.clientId)
    return {
      text: message.value.text,
      author: author ? (author.value.name || author.value.id) : '',
      isMine: message.value.clientId === me.id
    }
  }).reverse()
})

export default connect(mapStateToProps)(Messages)
