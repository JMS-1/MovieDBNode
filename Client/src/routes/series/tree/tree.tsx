import * as React from 'react'

import { SeriesSearch } from '../../../components/search/searchRedux'
import { SeriesNode } from '../../../components/tree/levelRedux'

export interface ISeriesTreeUiProps {
    id: string
}

export interface ISeriesTreeProps {}

export interface ISeriesTreeActions {}

export type TSeriesTreeProps = ISeriesTreeProps & ISeriesTreeUiProps & ISeriesTreeActions

export class CSeriesTree extends React.PureComponent<TSeriesTreeProps> {
    render(): JSX.Element {
        return (
            <div className='movie-db-series-tree'>
                <SeriesSearch />
                <SeriesNode scope='' detail={this.props.id} />
            </div>
        )
    }
}
