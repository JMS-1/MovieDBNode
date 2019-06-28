import * as React from 'react'
import { RouteComponentProps } from 'react-router'

export interface IRecordingParams {
    id: string
}

export interface IRecordingUiProps extends RouteComponentProps<IRecordingParams> {}

export interface IRecordingProps {}

export interface IRecordingActions {}

export type TRecordingProps = IRecordingProps & IRecordingUiProps & IRecordingActions

export class CRecording extends React.PureComponent<TRecordingProps> {
    render(): JSX.Element {
        return <div className='movie-db-recording-edit'>{this.props.match.params.id}</div>
    }
}
