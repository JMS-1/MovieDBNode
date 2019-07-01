import * as React from 'react'

export interface ILanguageRouteUiProps {}

export interface ILanguageRouteProps {}

export interface ILanguageRouteActions {}

export type TLanguageRouteProps = ILanguageRouteProps & ILanguageRouteUiProps & ILanguageRouteActions

export class CLanguageRoute extends React.PureComponent<TLanguageRouteProps> {
    render(): JSX.Element {
        return <div className='movie-db-language-route'>[LANGUAGE]</div>
    }
}
