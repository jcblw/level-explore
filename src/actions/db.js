import DBDispatcher from '../dispatcher/db'
import DBContants from '../constants/db'

export default {
  streamAll () {
    DBDispatcher.dispatch({
      actionType: DBContants.DB_STREAM
    })
  },
  get (key) {
    DBDispatcher.dispatch({
      actionType: DBContants.DB_GET,
      action: {key}
    })
  },
  unsetCurrent () {
    DBDispatcher.dispatch({
      actionType: DBContants.DB_UNSET
    })
  }
}
