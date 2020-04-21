import { observer } from 'mobx-react'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'

import { ContainerDetails } from './details/details'
import { ContainerTree } from './tree/tree'

import { MasterDetailRoute } from '../../components/masterDetailRoute/masterDetail'

export interface IContainerRouteParams {
    id?: string
}

export interface IContainerRouteUiProps extends RouteComponentProps<IContainerRouteParams> {}

@observer
export class ContainerRoute extends React.PureComponent<IContainerRouteUiProps> {
    render(): JSX.Element {
        const { id } = this.props.match.params

        return (
            <MasterDetailRoute className='movie-db-container-route'>
                <ContainerTree id={id} />
                <ContainerDetails id={id} />
            </MasterDetailRoute>
        )
    }
}
