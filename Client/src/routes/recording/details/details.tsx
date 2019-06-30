import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Button, Dropdown, DropdownProps, Form, Input } from 'semantic-ui-react'
import { isArray } from 'util'

import { IRecording } from 'movie-db-api'
import { ISelectOption } from 'movie-db-client'

import { RecordingTextInput } from '../../../components/textInput/textInputRedux'

export interface IRecordingParams {
    id: string
}

export interface IRecordingUiProps extends RouteComponentProps<IRecordingParams> {}

export interface IRecordingProps {
    cancelLabel: string
    genreHint: string
    genreLabel: string
    genreOptions: ISelectOption[]
    genres: string[]
    hasChanges: boolean
    hasError: boolean
    idLabel: string
    languageHint: string
    languageLabel: string
    languageOptions: ISelectOption[]
    languages: string[]
    saveAndBackLabel: string
    series: string
    seriesHint: string
    seriesLabel: string
    seriesOptions: ISelectOption[]
}

export interface IRecordingActions {
    cancel(): void
    loadRecording(): void
    saveAndBack(): void
    setProp<TProp extends keyof IRecording>(prop: TProp, value: IRecording[TProp]): void
}

export type TRecordingProps = IRecordingProps & IRecordingUiProps & IRecordingActions

export class CRecording extends React.PureComponent<TRecordingProps> {
    render(): JSX.Element {
        const { hasChanges, hasError } = this.props

        return (
            <div className='movie-db-recording-edit'>
                <Form error={hasError}>
                    <Form.Field>
                        <label>{this.props.idLabel}</label>
                        <Input input='text' value={this.props.match.params.id || ''} readOnly disabled />
                    </Form.Field>
                    <RecordingTextInput prop='name' required />
                    <RecordingTextInput prop='description' textarea />
                    <Form.Field>
                        <label>{this.props.seriesLabel}</label>
                        <Dropdown
                            clearable
                            fluid
                            onChange={this.setSeries}
                            options={this.props.seriesOptions}
                            placeholder={this.props.seriesHint}
                            search
                            selection
                            scrolling
                            value={this.props.series || ''}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>{this.props.genreLabel}</label>
                        <Dropdown
                            clearable
                            fluid
                            multiple
                            onChange={this.setGenres}
                            options={this.props.genreOptions}
                            placeholder={this.props.genreHint}
                            search
                            selection
                            scrolling
                            value={this.props.genres}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>{this.props.languageLabel}</label>
                        <Dropdown
                            clearable
                            fluid
                            multiple
                            onChange={this.setLanguages}
                            options={this.props.languageOptions}
                            placeholder={this.props.languageHint}
                            search
                            selection
                            scrolling
                            value={this.props.languages}
                        />
                    </Form.Field>
                    <RecordingTextInput prop='containerPosition' />
                    <RecordingTextInput prop='rentTo' />
                </Form>
                <Button.Group>
                    <Button onClick={this.props.cancel} disabled={!hasChanges}>
                        {this.props.cancelLabel}
                    </Button>
                    <Button onClick={this.props.saveAndBack} disabled={hasError || !hasChanges}>
                        {this.props.saveAndBackLabel}
                    </Button>
                </Button.Group>
            </div>
        )
    }

    private readonly setSeries = (ev: React.SyntheticEvent<HTMLElement>, data: DropdownProps): void => {
        this.props.setProp('series', (typeof data.value === 'string' ? data.value : '') || undefined)
    }

    private readonly setGenres = (ev: React.SyntheticEvent<HTMLElement>, data: DropdownProps): void =>
        this.props.setProp('genres', isArray(data.value) ? (data.value as string[]) : [])

    private readonly setLanguages = (ev: React.SyntheticEvent<HTMLElement>, data: DropdownProps): void =>
        this.props.setProp('languages', isArray(data.value) ? (data.value as string[]) : [])

    componentWillMount(): void {
        this.props.loadRecording()
    }
}
