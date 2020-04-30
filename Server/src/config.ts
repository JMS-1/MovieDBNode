import { existsSync, readFileSync } from 'fs'
import { join } from 'path'

export interface IConfiguration {
    db: string
    password: string
    port: number
    user: string
    gqlPassword: string
    gqlUser: string
}

function loadConfig(name: string): IConfiguration {
    const defPath = join(__dirname, `../config${name}.json`)

    if (!existsSync(defPath)) {
        return undefined
    }

    const raw = readFileSync(defPath).toString()

    return JSON.parse(raw.substr(raw.indexOf('{')))
}

export const Config = { ...loadConfig(''), ...loadConfig('.custom') }
