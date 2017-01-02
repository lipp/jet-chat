import {connect} from 'react-redux'
import Messages from '../components/Messages'

const mapStateToProps = ({messages, me = {}}) => ({
  messages: messages.map(message => ({
    ...message.value,
    isMine: message.value.authorId === me.id
  })).reverse()
})

export default connect(mapStateToProps)(Messages)
