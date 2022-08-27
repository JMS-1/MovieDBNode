import './index.scss'

import * as React from 'react'
import { createRoot } from 'react-dom/client'

import { Root } from './components/root/root'
import { rootStore } from './stores'

rootStore.startup()

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.querySelector('client-root')!).render(
    <rootStore.Router>
        <Root />
    </rootStore.Router>
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
