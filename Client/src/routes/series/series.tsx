import * as React from 'react'
import { RouteComponentProps } from 'react-router'

export interface ISeriesRouteParams {
    _id?: string
}

export interface ISeriesRouteUiProps extends RouteComponentProps<ISeriesRouteParams> {}

export interface ISeriesRouteProps {}

export interface ISeriesRouteActions {}

export type TSeriesRouteProps = ISeriesRouteProps & ISeriesRouteUiProps & ISeriesRouteActions

export class CSeriesRoute extends React.PureComponent<TSeriesRouteProps> {
    render(): JSX.Element {
        return <div className='movie-db-series-route movie-db-route'>[SERIES]</div>
    }
}
