import React from 'react'
import blessed from 'blessed'
import {render} from 'react-blessed'
import {Screen} from './components'

function start (dbpath) {
  const screen = blessed.screen({
    autoPadding: true,
    smartCSR: true,
    title: `exploring ${dbpath.split('/').pop()}`
  })

  screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0)
  })

  render(<Screen db={dbpath}/>, screen)
}

export {start}
