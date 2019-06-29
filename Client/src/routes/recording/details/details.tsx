import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Form, Input } from 'semantic-ui-react'

import { RecordingTextInput } from '../../../components/textInput/textInputRedux'

export interface IRecordingParams {
    id: string
}

export interface IRecordingUiProps extends RouteComponentProps<IRecordingParams> {}

export interface IRecordingProps {
    idLabel: string
}

export interface IRecordingActions {
    loadRecording(): void
}

export type TRecordingProps = IRecordingProps & IRecordingUiProps & IRecordingActions

export class CRecording extends React.PureComponent<TRecordingProps> {
    render(): JSX.Element {
        return (
            <Form className='movie-db-recording-edit'>
                <Form.Field>
                    <label>{this.props.idLabel}</label>
                    <Input input='text' value={this.props.match.params.id || ''} readOnly disabled />
                </Form.Field>
                <RecordingTextInput prop='name' required />
            </Form>
        )
    }

    componentWillMount(): void {
        this.props.loadRecording()
    }
}
