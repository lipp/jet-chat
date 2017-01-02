const jet = require('node-jet')
const uuid = require('uuid')

const daemon = new jet.Daemon()
const peer = new jet.Peer({url: 'ws://localhost:3001'})
const messages = []

const addMessage = new jet.Method('message/add')
  .on('call', args => {
    const id = uuid.v1()
    const message = new jet.State('message/#' + id, {
      postedAt: Date.now(),
      id,
      text: args[0],
      authorId: args[1],
      author: args[2]
    })
    peer.add(message)
    messages.push(message)
    if (messages.length > 30) {
      messages.shift().remove()
    }
  })

Promise.all([
  peer.connect(),
  peer.add(addMessage)
]).then(() => {
  console.log('chat server ready')
})

daemon.listen({
  wsPort: 3001
})
