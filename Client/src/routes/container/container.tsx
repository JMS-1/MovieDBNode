import * as React from 'react'
import { RouteComponentProps } from 'react-router'

export interface IContainerRouteParams {
    id?: string
}

export interface IContainerRouteUiProps extends RouteComponentProps<IContainerRouteParams> {}

export interface IContainerRouteProps {}

export interface IContainerRouteActions {}

export type TContainerRouteProps = IContainerRouteProps & IContainerRouteUiProps & IContainerRouteActions

export class CContainerRoute extends React.PureComponent<TContainerRouteProps> {
    render(): JSX.Element {
        return <div className='movie-db-container-route movie-db-route'>[CONTAINER {this.props.match.params.id}]</div>
    }
}
