var jet = require('node-jet')

var daemon = new jet.Daemon()

daemon.listen({
  wsPort: 3001
})
