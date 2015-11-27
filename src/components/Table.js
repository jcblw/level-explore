import React, {Component, PropTypes} from 'react'
import logActions from '../actions/log'
const propTypes = {
  values: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  onSelect: PropTypes.func
}
const defaultProps = {
  values: []
}

class Table extends Component {

  constructor (props) {
    super(props)
    this.onSelect = this.onSelect.bind(this)
  }

  onSelect (spec, index) {
    const selected = this.props.values[index - 1]
    if (this.props.onSelect) {
      this.props.onSelect(...selected)
    }
    logActions.log(`${selected[0]} selected`)
  }

  render () {
    const yes = true
    const no = false
    const {values} = this.props
    const vals = [['Key', 'Value'], ...values]
    return <listtable
      border={{type: 'line'}}
      style={{
        border: {fg: 'grey'},
        cell: {
          hover: {bg: 'grey'},
          selected: {bg: 'blue'}
        },
        header: {bg: 'white'}
      }}
      top='1%'
      left='1%'
      width='98%'
      height='78%'
      rows={vals}
      pad={10}
      scrollable={yes}
      alwaysScroll={yes}
      mouse={yes}
      noCellBorders={no}
      onSelect={this.onSelect}
    />
  }
}

Table.propTypes = propTypes
Table.defaultProps = defaultProps

export default Table
