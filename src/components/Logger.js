import React, {Component, PropTypes} from 'react'
import LogContainer from './containers/Log'
const propTypes = {
  logs: PropTypes.arrayOf(PropTypes.string)
}
const defaultProps = {
  logs: []
}

class Logger extends Component {

  componentDidUpdate () {
    const {logs} = this.refs
    logs.scroll(this.props.logs.length - 1)
  }

  render () {
    const yes = true
    return <list
      label='logs'
      border={{type: 'line'}}
      style={{border: {fg: 'grey'}}}
      top='75%'
      left='1%'
      width='98%'
      height='18%'
      interactive={yes}
      items={this.props.logs}
      scrollable={yes}
      alwaysScroll={yes}
      mouse={yes}
      ref='logs'
    />
  }
}

Logger.propTypes = propTypes
Logger.defaultProps = defaultProps

export default LogContainer(Logger)
