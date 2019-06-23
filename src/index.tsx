import { ConnectedRouter } from 'connected-react-router'
import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { Root } from './components/root/rootRedux'
import { history, initializeStore } from './store'

const store = initializeStore()

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Root />
        </ConnectedRouter>
    </Provider>,
    document.querySelector('client-root'),
)
