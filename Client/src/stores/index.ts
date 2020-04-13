import { RootStore } from './root'

export const rootStore = new RootStore()

export const { containers, genres, languages, recordings, series } = rootStore
