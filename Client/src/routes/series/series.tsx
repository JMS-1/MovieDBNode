import { observer } from 'mobx-react'
import * as React from 'react'
import { useParams } from 'react-router'

import { SeriesDetails } from './details/details'
import { SeriesTree } from './tree/tree'

import { MasterDetailRoute } from '../../components/masterDetailRoute/masterDetail'

export const SeriesRoute: React.FC = observer(() => {
    const { id } = useParams()

    return (
        <MasterDetailRoute className='movie-db-series-route'>
            <SeriesTree id={id} />
            <SeriesDetails id={id} />
        </MasterDetailRoute>
    )
})
