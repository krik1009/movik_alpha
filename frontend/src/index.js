import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import App from './App'
import { TrackerProvider, Tracker } from 'react-tracker'
import trackContentsViews from './trackers/trackers'

const tracker = new Tracker([trackContentsViews])

ReactDOM.
// render(<App />, document.getElementById('root'))
render(
  <TrackerProvider tracker={tracker}>
    <App />
  </TrackerProvider>,
  document.getElementById('root')
)