import React, {Component} from 'react'

function StoreClassDecorator ({key, Store}) {
  return function classDecorator (DecoratedComponent) {
    class StoreContainer extends Component {
      constructor () {
        super()
        this.onChange = this.onChange.bind(this)
        this.state = {
          [key]: Store.getAll()
        }
      }
      componentDidMount () {
        Store.onChange(this.onChange)
      }
      componentWillUnmount () {
        Store.offChange(this.onChange)
      }
      onChange () {
        this.setState({
          [key]: Store.getAll()
        })
      }
      render () {
        return (<DecoratedComponent {...this.props} {...this.state} />)
      }
    }
    StoreContainer.diplayName = `StoreContainer(${DecoratedComponent.displayName})`
    return StoreContainer
  }
}

export default StoreClassDecorator
