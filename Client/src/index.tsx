import * as React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router'

import { Root } from './components/root/root'
import { rootStore, history } from './stores'

rootStore.setTheme('default')

rootStore.startup()

render(
    <Router history={history}>
        <Root />
    </Router>,
    document.querySelector('client-root')
)

// Kleine Hilfe zum Styling während der Entwicklung.

document.addEventListener('keydown', (ev: KeyboardEvent) => {
    if (!ev.ctrlKey || ev.key !== 'F12') {
        return
    }

    const css = document.querySelectorAll('head > link[rel="stylesheet"]')

    for (let i = 0; i < css.length; i++) {
        const link = css[i] as HTMLLinkElement

        // eslint-disable-next-line no-self-assign
        link.href = link.href
    }
})
