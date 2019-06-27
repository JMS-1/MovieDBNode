import * as React from 'react'

export interface IGenreUiProps {
    id: string
}

export interface IGenreProps {
    name: string
}

export interface IGenreActions {}

export type TGenreProps = IGenreProps & IGenreUiProps & IGenreActions

export class CGenre extends React.PureComponent<TGenreProps> {
    render(): JSX.Element {
        return <>{this.props.name}</>
    }
}
