const jet = require('node-jet')
const uuid = require('uuid')
const jsonwebtoken = require('jsonwebtoken')
const cookie = require('cookie')
const tokenSecret = process.env.LW_JWT_SECRET

if (!tokenSecret) {
  console.error('no LW_JWT_SECRET')
  process.exit(1)
}

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
      author: args[2],
      avatar: args[3]
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

const isLocalhostRequest = req => (
  req.connection.remoteAddress.indexOf('127.0.0.1') > -1
)

const hasValidJwt = req => {
  const jwtCookie = cookie.parse(req.headers.cookie).jwt
  return jsonwebtoken.verify(jwtCookie, tokenSecret)
}

daemon.listen({
  wsPort: 3001,
  wsGetAuthentication: ({req}) => {
    try {
      if (isLocalhostRequest(req) || hasValidJwt(req)) {
        return {}
      }
    } catch (err) {}
    return false
  }
})
