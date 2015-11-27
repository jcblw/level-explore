import React, {Component, PropTypes} from 'react'
import LogAction from '../actions/log'
import dbActions from '../actions/db'
const propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  onClick: PropTypes.func
}
const defaultProps = {}

class Popover extends Component {

  constructor () {
    super()
    this.onClose = this.onClose.bind(this)
  }

  onClose () {
    LogAction.log('onCloseClick')
    dbActions.unsetCurrent()
  }

  getContent (content) {
    let body
    try {
      body = JSON.stringify(JSON.parse(content), null, '\t')
    } catch (e) {
      body = content
    }
    return body
  }

  render () {
    const {title, content} = this.props
    const baseStyle = {bg: 'white', fg: 'black'}
    const button = {bg: 'white', fg: 'black', hover: {bg: 'red', fg: 'white'}}
    const yes = true
    return (
      <box
        style={baseStyle}
        top='5%'
        left='5%'
        width='90%'
        height='90%'
        pad={3}
      >
        <box
          top='0%'
          left='95%'
          clickable={yes}
          mouse={yes}
          width='5%'
          height='5%'
          style={button}
          onClick={this.onClose}
        >
          ✕
        </box>
        <box
          style={baseStyle}
          top='1%'
          left='1%'
          width='70%'
        >
          {title}
        </box>
        <box
          style={baseStyle}
          top='10%'
          left='1%'
          width='98%'
          height='90%'
          scrollable={yes}
          alwaysScroll={yes}
        >
          {this.getContent(content)}
        </box>
      </box>
    )
  }
}

Popover.propTypes = propTypes
Popover.defaultProps = defaultProps

export default Popover
