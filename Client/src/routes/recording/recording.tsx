import * as React from 'react'
import { RouteComponentProps } from 'react-router'

export interface IRecordingRouteParams {
    id?: string
}

export interface IRecordingRouteUiProps extends RouteComponentProps<IRecordingRouteParams> {}

export interface IRecordingRouteProps {}

export interface IRecordingRouteActions {}

export type TRecordingRouteProps = IRecordingRouteProps & IRecordingRouteUiProps & IRecordingRouteActions

export class CRecordingRoute extends React.PureComponent<TRecordingRouteProps> {
    render(): JSX.Element {
        return <div className='movie-db-recording-route'>[RECORDINGS {this.props.match.params.id}]</div>
    }
}
