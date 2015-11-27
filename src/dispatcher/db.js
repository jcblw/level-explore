import Dispatcher from './base'

class DBDispatcher extends Dispatcher {

  dbAction (action) {
    this.dispatch({
      actionType: 'DB_ACTION',
      action: action
    })
  }
}

export default new DBDispatcher()
