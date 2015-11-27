import React, {Component, PropTypes} from 'react'
import dbStore from '../stores/db'
import dbActions from '../actions/db'
import logActions from '../actions/log'
import DBContainer from './containers/DB'
import {Logger, Table, Popover} from './'
const propTypes = {
  db: PropTypes.string
}

class Screen extends Component {

  constructor (props) {
    super(props)
    logActions.log('DB init')
    dbStore.init(props.db)
    this.onSelect = this.onSelect.bind(this)
  }

  componentDidMount () {
    logActions.log('Streaming data')
    dbActions.streamAll()
  }

  onSelect (name) {
    dbActions.get(name)
  }

  componentDidUpdate () {
    const {current} = this.props.DB
    logActions.log(`${!!current} is current`)
  }

  render () {
    const {values, current} = this.props.DB
    const popoverFrag = current ? (<Popover title={current.key} content={current.value} />) : null
    return (
      <box
        label='level explore'
        border={{type: 'line'}}
        style={{border: {fg: 'grey'}}}
      >
        <Table
          values={values}
          onSelect={this.onSelect}
        />
        <Logger />
        {popoverFrag}
      </box>
    )
  }
}

Screen.propTypes = propTypes

export default DBContainer(Screen)
