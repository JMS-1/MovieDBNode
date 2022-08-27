// eslint-disable-next-line unused-imports/no-unused-imports-ts
import { observer } from 'mobx-react'
import * as React from 'react'
import { Button, Dropdown, DropdownProps, Form } from 'semantic-ui-react'

import { IRecording } from '../../../../../Server/src/model/client'
import { TRecordingContainerType } from '../../../../../Server/src/model/enum'
import { DeleteConfirm } from '../../../components/confirm/confirm'
import { TextInput } from '../../../components/textInput/textInput'
import { containers, genres, languages, recordings, rootStore, series, translations } from '../../../stores'
import { RecordingLinks } from '../links/links'

export interface IRecordingUiProps {
    match?: { params: { id?: string } }
}

const noSelection: string[] = []

@observer
export class Recording extends React.PureComponent<IRecordingUiProps> {
    render(): JSX.Element {
        const { workingCopy, errors } = recordings

        const mui = translations.strings.recording
        const emui = mui.edit

        return (
            <div className='movie-db-recording-edit'>
                <DeleteConfirm scope='recording' store={recordings} />
                <div>
                    <Button disabled={!workingCopy.isDirty} onClick={this.onCancel}>
                        {workingCopy._id ? translations.strings.reset : translations.strings.cancel}
                    </Button>
                    <Button disabled={errors !== true || !workingCopy.isDirty} onClick={this.onSaveAndBack}>
                        {mui.saveAndBack}
                    </Button>
                    <Button disabled={errors !== true || !workingCopy.isDirty} onClick={this.onSaveAndCopy}>
                        {mui.saveAndCopy}
                    </Button>
                    {workingCopy._id && <Button onClick={this.onCopy}>{mui.createCopy}</Button>}
                    {workingCopy._id && <Button onClick={this.onConfirmRemove}>{translations.strings.remove}</Button>}
                </div>
                <Form error={errors !== true}>
                    <TextInput<IRecording> required prop='name' scope='recording' store={recordings} />
                    <RecordingLinks />
                    <TextInput<IRecording> textarea prop='description' scope='recording' store={recordings} />
                    <Form.Field>
                        <label>{emui.series}</label>
                        <Dropdown
                            clearable
                            fluid
                            scrolling
                            search
                            selection
                            options={series.asOptions}
                            placeholder={mui.editSeries}
                            value={workingCopy.series || ''}
                            onChange={this.setSeries}
                        />
                    </Form.Field>
                    <Form.Field required>
                        <label>{emui.containerType}</label>
                        <Dropdown
                            fluid
                            scrolling
                            search
                            selection
                            options={recordings.typeAsOptions}
                            placeholder={mui.editType}
                            value={workingCopy.containerType || 'Undefined'}
                            onChange={this.setType}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>{emui.genres}</label>
                        <Dropdown
                            clearable
                            fluid
                            multiple
                            scrolling
                            search
                            selection
                            options={genres.asOptions}
                            placeholder={mui.editGenres}
                            value={workingCopy.genres || noSelection}
                            onChange={this.setGenres}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>{emui.languages}</label>
                        <Dropdown
                            clearable
                            fluid
                            multiple
                            scrolling
                            search
                            selection
                            options={languages.asOptions}
                            placeholder={mui.editLanguages}
                            value={workingCopy.languages || noSelection}
                            onChange={this.setLanguages}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>{emui.containerId}</label>
                        <Dropdown
                            clearable
                            fluid
                            scrolling
                            search
                            selection
                            options={containers.asOptions}
                            placeholder={mui.editContainer}
                            value={workingCopy.containerId || ''}
                            onChange={this.setContainer}
                        />
                    </Form.Field>
                    <TextInput<IRecording> prop='containerPosition' scope='recording' store={recordings} />
                    <TextInput<IRecording> prop='rentTo' scope='recording' store={recordings} />
                </Form>
            </div>
        )
    }

    private readonly onConfirmRemove = (): void => {
        recordings.deleteConfirm = true
    }

    private readonly onCancel = (): void => {
        recordings.workingCopy.reset()
    }

    private readonly onCopy = async (): Promise<void> => {
        recordings.createCopy()
    }

    private readonly onSaveAndBack = async (): Promise<void> => {
        if (await recordings.addOrUpdate()) {
            rootStore.router.push(recordings.itemRoute)
        }
    }

    private readonly onSaveAndCopy = async (): Promise<void> => {
        if (await recordings.addOrUpdate()) {
            recordings.createCopy()
        }
    }

    private readonly setSeries = (ev: React.SyntheticEvent<HTMLElement>, data: DropdownProps): void => {
        recordings.workingCopy.series = (typeof data.value === 'string' ? data.value : '') || undefined
    }

    private readonly setContainer = (ev: React.SyntheticEvent<HTMLElement>, data: DropdownProps): void => {
        recordings.workingCopy.containerId = (typeof data.value === 'string' ? data.value : '') || undefined
    }

    private readonly setType = (ev: React.SyntheticEvent<HTMLElement>, data: DropdownProps): void => {
        recordings.workingCopy.containerType = data.value as TRecordingContainerType
    }

    private readonly setGenres = (ev: React.SyntheticEvent<HTMLElement>, data: DropdownProps): void => {
        recordings.workingCopy.genres = Array.isArray(data.value) ? (data.value as string[]) : []
    }

    private readonly setLanguages = (ev: React.SyntheticEvent<HTMLElement>, data: DropdownProps): void => {
        recordings.workingCopy.languages = Array.isArray(data.value) ? (data.value as string[]) : []
    }

    UNSAFE_componentWillMount(): void {
        recordings.load(this.props.match?.params.id)
    }

    UNSAFE_componentWillReceiveProps(props: Readonly<IRecordingUiProps>): void {
        if (props.match?.params.id !== this.props.match?.params.id) {
            recordings.load(props.match?.params.id)
        }
    }
}
