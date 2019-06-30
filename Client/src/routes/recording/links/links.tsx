import * as React from 'react'
import { Form } from 'semantic-ui-react'

export interface IRecordingLinksUiProps {}

export interface IRecordingLinksProps {}

export interface IRecordingLinksActions {}

export type TRecordingLinksProps = IRecordingLinksProps & IRecordingLinksUiProps & IRecordingLinksActions

export class CRecordingLinks extends React.PureComponent<TRecordingLinksProps> {
    render(): JSX.Element {
        return <Form.Group className='movie-db-container-links'>[LINKS]</Form.Group>
    }
}
