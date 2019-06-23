import { RouterState } from 'connected-react-router'

import { IMuiState } from './mui'

export * from './mui'

export interface IClientState {
    readonly mui: IMuiState
    readonly router: RouterState
}
