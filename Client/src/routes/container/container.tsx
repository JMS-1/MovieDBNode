import { observer } from 'mobx-react'
import * as React from 'react'
import { useParams } from 'react-router'

import { ContainerDetails } from './details/details'
import { ContainerTree } from './tree/tree'

import { MasterDetailRoute } from '../../components/masterDetailRoute/masterDetail'

export const ContainerRoute: React.FC = observer((_props) => {
    const { id } = useParams()

    return (
        <MasterDetailRoute className='movie-db-container-route'>
            <ContainerTree id={id} />
            <ContainerDetails id={id} />
        </MasterDetailRoute>
    )
})
