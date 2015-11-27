import {EventEmitter} from 'events'
import Immutable from 'immutable'
import invariant from 'invariant'
const CHANGE_EVENT = 'change'

class Store extends EventEmitter {

  constructor (options = {}) {
    const {storage, Dispatcher} = options
    invariant(storage, 'Store must be passed an object to store data')
    invariant(Dispatcher, 'Store must be passed a Dispatcher to gather events from')
    super(options)
    this._store = storage
    this._on = this.on
    Dispatcher.register((payload) => {
      const {actionType, action} = payload
      if (this.onAction) {
        this.onAction(actionType, action)
      }
    })
  }
  getAll () {
    return Immutable.fromJS(this._store).toJSON()
  }
  hasChanged () {
    this.emit(CHANGE_EVENT)
  }
  onChange (callback) {
    this.on(CHANGE_EVENT, callback)
  }
  offChange (callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }
}

export default Store
