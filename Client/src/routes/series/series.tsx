import { observer } from 'mobx-react'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'

import { SeriesDetails } from './details/details'
import { SeriesTree } from './tree/tree'

import { MasterDetailRoute } from '../../components/masterDetailRoute/masterDetail'

export interface ISeriesRouteParams {
    id?: string
}

export interface ISeriesRouteUiProps extends RouteComponentProps<ISeriesRouteParams> {}

@observer
export class SeriesRoute extends React.PureComponent<ISeriesRouteUiProps> {
    render(): JSX.Element {
        const { id } = this.props.match.params

        return (
            <MasterDetailRoute className='movie-db-series-route'>
                <SeriesTree id={id} />
                <SeriesDetails id={id} />
            </MasterDetailRoute>
        )
    }
}
