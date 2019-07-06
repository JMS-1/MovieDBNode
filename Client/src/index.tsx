import { ConnectedRouter } from 'connected-react-router'
import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { Root } from './components/root/rootRedux'
import * as controller from './controller'
import { GenreActions } from './controller/genre'
import { history, initializeStore, ServerApi } from './store'

const store = initializeStore()

store.dispatch(controller.ApplicationActions.setTheme('default'))

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Root />
        </ConnectedRouter>
    </Provider>,
    document.querySelector('client-root'),
)

ServerApi.get('container', controller.ContainerActions.load)
ServerApi.get('genre', GenreActions.load)
ServerApi.get('language', controller.LanguageActions.load)
ServerApi.get('schemas', controller.ApplicationActions.loadSchemas)
ServerApi.get('series', controller.SeriesActions.load)

// Kleine Hilfe zum Styling während der Entwicklung.

document.addEventListener('keydown', (ev: KeyboardEvent) => {
    if (!ev.ctrlKey || ev.key !== 'F12') {
        return
    }

    const css = document.querySelectorAll('head > link[rel="stylesheet"]')

    for (let i = 0; i < css.length; i++) {
        const link = css[i] as HTMLLinkElement

        link.href = link.href
    }
})
