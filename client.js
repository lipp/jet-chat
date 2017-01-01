/* globals localStorage */
import uuid from 'uuid'

export default {
  id: uuid.v1(),
  name: typeof localStorage !== 'undefined' ? localStorage.name : '',
  createdAt: Date.now()
}
