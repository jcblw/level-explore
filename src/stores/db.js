import levelup from 'levelup'
import Base from './base'
import DBDispatcher from '../dispatcher/db'
import DBConstants from '../constants/db'
import logActions from '../actions/log'
const _db = {}
let db

function initDB (url) {
  db = levelup(url)
  _db.initized = true
  _db.url = url
  return true
}

function streamData (cb) {
  if (!db) return
  _db.values = []
  db.createReadStream()
    .on('data', (data) => {
      _db.values.push([data.key, data.value])
      if (cb) cb()
    })
    .on('error', (err) => {
      _db.error = err
    })
}

function getValue (key, callback) {
  if (!db) return
  logActions.log(`db getting ${key}`)
  db.get(key, (err, value) => {
    if (err) {
      _db.error = err
      logActions.log(err.message)
      return
    }
    _db.current = {key, value}
    callback()
  })
}

class DBStore extends Base {

  init (url) {
    initDB(url)
  }

  onAction (type, action) {
    switch (type) {
      case DBConstants.DB_STREAM:
        streamData(() => {
          this.hasChanged()
        })
        break
      case DBConstants.DB_INIT:
        if (initDB(action.url)) {
          this.hasChanged()
        }
        break
      case DBConstants.DB_GET:
        getValue(action.key, () => {
          this.hasChanged()
        })
        break
      case DBConstants.DB_UNSET:
        _db.current = null
        this.hasChanged()
        break

    }
  }
}

const store = new DBStore({storage: _db, Dispatcher: DBDispatcher})
export default store
