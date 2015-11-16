import levelup from 'levelup'

import React, {Component, PropTypes} from 'react'
import Logger from './Logger'
const propTypes = {
  db: PropTypes.string
}

class Screen extends Component {

  constructor (props) {
    super(props)
    this.state = {
      values: [['Key', 'Value']],
      logs: []
    }
    this.onSelect = this.onSelect.bind(this)
  }

  getKeyVals () {
    this.log('Stream started')
    this.db.createReadStream()
      .on('data', (data) => {
        const {values} = this.state
        this.log(`new value ${data.key}: ${typeof data.value}${data.value.substr(0, 10)}`)
        values.push([data.key, data.value.substr(0, 25)])
        this.setState({values})
      })
      .on('error', (err) => {
        this.log(err.message)
      })
      .on('end', () => {
        this.log('initial stream ended')
      })
  }

  getDB (dbPath, done) {
    this.db = levelup(dbPath)
    this.log('db connected')
    done()
  }

  log (str) {
    const {logs} = this.state
    const {length} = logs
    logs.push(`INFO: ${str}`)
    if ((length + 1) > 5) {
      logs.unshift() // this should alway only be one more
    }
    this.setState({logs})
  }

  componentDidMount () {
    this.getDB(this.props.db, () => {
      this.getKeyVals()
    })
  }

  onSelect (spec, index) {
    this.log(`selected ${index}`)
  }

  render () {
    const yes = true
    return (
      <box
        label='level explore'
        border={{type: 'line'}}
        style={{border: {fg: 'grey'}}}
      >
        <listtable
          border={{type: 'line'}}
          style={{border: {fg: 'grey'}}}
          top='1%'
          left='1%'
          width='98%'
          height='78%'
          rows={this.state.values}
          pad={5}
          scrollable={yes}
          alwaysScroll={yes}
          mouse={yes}
          onSelect={this.onSelect}
        />
        <Logger logs={this.state.logs} />
      </box>
    )
  }
}

Screen.propTypes = propTypes

export default Screen
