import * as React from 'react'
import { RouteComponentProps } from 'react-router'

import { SeriesDetails } from './details/detailsRedux'
import { SeriesTree } from './tree/treeRedux'

export interface ISeriesRouteParams {
    id?: string
}

export interface ISeriesRouteUiProps extends RouteComponentProps<ISeriesRouteParams> {}

export interface ISeriesRouteProps {}

export interface ISeriesRouteActions {}

export type TSeriesRouteProps = ISeriesRouteProps & ISeriesRouteUiProps & ISeriesRouteActions

export class CSeriesRoute extends React.PureComponent<TSeriesRouteProps> {
    render(): JSX.Element {
        const { id } = this.props.match.params

        return (
            <div className='movie-db-series-route movie-db-route'>
                <SeriesTree id={id} />
                <SeriesDetails id={id} />
            </div>
        )
    }
}