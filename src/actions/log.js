import LogDispatcher from '../dispatcher/db'
import LogContants from '../constants/db'

export default {
  log (msg) {
    LogDispatcher.dispatch({
      actionType: LogContants.PUT_LOG,
      action: {msg}
    })
  }
}
