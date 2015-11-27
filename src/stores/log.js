import Base from './base'
import LogDispatcher from '../dispatcher/db'
import LogConstants from '../constants/db'
const _logs = []

function putLog (msg) {
  _logs.push(msg)
  return true
}

class DBStore extends Base {

  onAction (type, action) {
    switch (type) {
      case LogConstants.PUT_LOG:
        if (putLog(action.msg)) {
          this.hasChanged()
        }
        break
    }
  }
}

const store = new DBStore({storage: _logs, Dispatcher: LogDispatcher})
export default store
