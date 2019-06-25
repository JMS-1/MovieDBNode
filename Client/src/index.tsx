import { ConnectedRouter } from 'connected-react-router'
import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { Root } from './components/root/rootRedux'
import {
    ApplicationActions, ContainerActions, LanguageActions, MediaActions, SeriesActions,
} from './controller'
import { GenreActions } from './controller/genre'
import { history, initializeStore, ServerApi } from './store'

const store = initializeStore()

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Root />
        </ConnectedRouter>
    </Provider>,
    document.querySelector('client-root'),
)

ServerApi.get('container', ContainerActions.load)
ServerApi.get('genre', GenreActions.load)
ServerApi.get('language', LanguageActions.load)
ServerApi.get('media', MediaActions.load)
ServerApi.get('schemas', ApplicationActions.loadSchemas)
ServerApi.get('series', SeriesActions.load)
