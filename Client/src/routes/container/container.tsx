import * as React from 'react'
import { RouteComponentProps } from 'react-router'

import { ContainerDetails } from './details/detailsRedux'
import { ContainerTree } from './tree/treeRedux'

import { MasterDetailRoute } from '../../components/masterDetailRoute/masterDetailRedux'

export interface IContainerRouteParams {
    id?: string
}

export interface IContainerRouteUiProps extends RouteComponentProps<IContainerRouteParams> {}

export interface IContainerRouteProps {}

export interface IContainerRouteActions {}

export type TContainerRouteProps = IContainerRouteProps & IContainerRouteUiProps & IContainerRouteActions

export class CContainerRoute extends React.PureComponent<TContainerRouteProps> {
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
