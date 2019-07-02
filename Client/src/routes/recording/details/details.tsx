import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Button, Dropdown, DropdownItemProps, DropdownProps, Form } from 'semantic-ui-react'
import { isArray } from 'util'

import { IRecording, mediaType } from 'movie-db-api'

import { RecordingLinks } from '../links/linksRedux'

import { ConfirmDeleteRecording } from '../../../components/confirm/confirmRedux'
import { RecordingTextInput } from '../../../components/textInput/textInputRedux'

export interface IRecordingParams {
    id: string
}

export interface IRecordingUiProps extends RouteComponentProps<IRecordingParams> {}

export interface IRecordingProps {
    cancelLabel: string
    container: string
    containerHint: string
    containerLabel: string
    containerOptions: DropdownItemProps[]
    deleteLabel: string
    genreHint: string
    genreLabel: string
    genreOptions: DropdownItemProps[]
    genres: string[]
    hasChanges: boolean
    hasError: boolean
    languageHint: string
    languageLabel: string
    languageOptions: DropdownItemProps[]
    languages: string[]
    saveAndBackLabel: string
    series: string
    seriesHint: string
    seriesLabel: string
    seriesOptions: DropdownItemProps[]
    showDelete: boolean
    type: mediaType
    typeHint: string
    typeLabel: string
    typeOptions: DropdownItemProps[]
}

export interface IRecordingActions {
    cancel(): void
    confirmDelete(): void
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
                <ConfirmDeleteRecording />
                <Button.Group>
                    <Button onClick={this.props.cancel} disabled={!hasChanges}>
                        {this.props.cancelLabel}
                    </Button>
                    <Button onClick={this.props.saveAndBack} disabled={hasError || !hasChanges}>
                        {this.props.saveAndBackLabel}
                    </Button>
                    {this.props.showDelete && (
                        <Button onClick={this.props.confirmDelete}>{this.props.deleteLabel}</Button>
                    )}
                </Button.Group>
                <Form error={hasError}>
                    <RecordingTextInput prop='name' required />
                    <RecordingLinks />
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
                    <Form.Field required>
                        <label>{this.props.typeLabel}</label>
                        <Dropdown
                            fluid
                            onChange={this.setType}
                            options={this.props.typeOptions}
                            placeholder={this.props.typeHint}
                            search
                            selection
                            scrolling
                            value={this.props.type || mediaType.Undefined}
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
                    <Form.Field>
                        <label>{this.props.containerLabel}</label>
                        <Dropdown
                            clearable
                            fluid
                            onChange={this.setContainer}
                            options={this.props.containerOptions}
                            placeholder={this.props.containerHint}
                            search
                            selection
                            scrolling
                            value={this.props.container || ''}
                        />
                    </Form.Field>
                    <RecordingTextInput prop='containerPosition' />
                    <RecordingTextInput prop='rentTo' />
                </Form>
            </div>
        )
    }

    private readonly setSeries = (ev: React.SyntheticEvent<HTMLElement>, data: DropdownProps): void => {
        this.props.setProp('series', (typeof data.value === 'string' ? data.value : '') || undefined)
    }

    private readonly setContainer = (ev: React.SyntheticEvent<HTMLElement>, data: DropdownProps): void => {
        this.props.setProp('containerId', (typeof data.value === 'string' ? data.value : '') || undefined)
    }

    private readonly setType = (ev: React.SyntheticEvent<HTMLElement>, data: DropdownProps): void => {
        this.props.setProp('containerType', typeof data.value === 'number' ? data.value : mediaType.Undefined)
    }

    private readonly setGenres = (ev: React.SyntheticEvent<HTMLElement>, data: DropdownProps): void =>
        this.props.setProp('genres', isArray(data.value) ? (data.value as string[]) : [])

    private readonly setLanguages = (ev: React.SyntheticEvent<HTMLElement>, data: DropdownProps): void =>
        this.props.setProp('languages', isArray(data.value) ? (data.value as string[]) : [])

    componentWillMount(): void {
        this.props.loadRecording()
    }
}
