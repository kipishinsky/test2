import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

import './styles/index.module.scss'

import {App} from './components/App'
import {Provider} from 'react-redux'
import {reduxStore} from './store/store'

ReactDOM.render(
	<React.StrictMode>
		<Provider store={reduxStore}>
			<App/>
		</Provider>
	</React.StrictMode>, document.getElementById('root')
)

serviceWorker.unregister()
