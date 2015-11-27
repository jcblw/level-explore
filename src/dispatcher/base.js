class Dispatcher {

  constructor () {
    this._callbacks = []
  }
  register (callback) {
    this._callbacks.push(callback)
    return this._callbacks.length - 1
  }
  dispatch (payload) {
    const resolves = []
    const rejects = []
    this._promises = this._callbacks.map((_, index) => {
      return new Promise((reject, resolve) => {
        rejects.push(reject)
        resolves.push(resolve)
      })
    })
    this._callbacks.forEach((callback, index) => {
      Promise.resolve(callback(payload)).then(() => {
        resolves[index](payload)
      }, () => {
        rejects[index](new Error('Dispatcher callback was unsuccessful'))
      })
    })
    this._promises = []
  }
}

export default Dispatcher
