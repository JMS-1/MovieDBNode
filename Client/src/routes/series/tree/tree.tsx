// eslint-disable-next-line unused-imports/no-unused-imports-ts
import { observer } from 'mobx-react'
import * as React from 'react'

import { ISeries } from '../../../../../Server/src/model/client'
import { Search } from '../../../components/search/search'
import { Node } from '../../../components/tree/level'
import { series } from '../../../stores'

export interface ISeriesTreeUiProps {
    id: string | undefined
}

export interface ISeriesTreeProps {}

export interface ISeriesTreeActions {}

export type TSeriesTreeProps = ISeriesTreeProps & ISeriesTreeUiProps & ISeriesTreeActions

@observer
export class SeriesTree extends React.PureComponent<TSeriesTreeProps> {
    render(): JSX.Element {
        return (
            <div className='movie-db-series-tree movie-db-tree'>
                <Search store={series} />
                <Node<ISeries> id='' scope={this.props.id} store={series} />
            </div>
        )
    }
}
