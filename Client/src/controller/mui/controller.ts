import { IMuiState } from 'movie-db-client'

import { translations } from '../../stores'

export function getInitialState(): IMuiState {
    return translations.strings
}
