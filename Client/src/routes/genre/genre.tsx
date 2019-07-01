import * as React from 'react'

export interface IGenreRouteUiProps {}

export interface IGenreRouteProps {}

export interface IGenreRouteActions {}

export type TGenreRouteProps = IGenreRouteProps & IGenreRouteUiProps & IGenreRouteActions

export class CGenreRoute extends React.PureComponent<TGenreRouteProps> {
    render(): JSX.Element {
        return <div className='movie-db-genre-route'>[GENRE]</div>
    }
}
