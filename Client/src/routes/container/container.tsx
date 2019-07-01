import * as React from 'react'
import { RouteComponentProps } from 'react-router'

import { ContainerDetails } from './details/detailsRedux'
import { ContainerTree } from './tree/treeRedux'

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
            <div className='movie-db-container-route movie-db-route'>
                <ContainerTree id={id} />
                <ContainerDetails id={id} />
            </div>
        )
    }
}
