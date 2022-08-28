import { observer } from 'mobx-react'
import * as React from 'react'
import { useNavigate, useParams } from 'react-router'
import { Button, Dropdown, DropdownProps, Form } from 'semantic-ui-react'

import { IRecording } from '../../../../../Server/src/model/client'
import { TRecordingContainerType } from '../../../../../Server/src/model/enum'
import { DeleteConfirm } from '../../../components/confirm/confirm'
import { TextInput } from '../../../components/textInput/textInput'
import { containers, genres, languages, recordings, series, translations } from '../../../stores'
import { RecordingLinks } from '../links/links'

const noSelection: string[] = []

export const Recording: React.FC = observer(() => {
    const { id } = useParams()
    const goto = useNavigate()

    const { workingCopy, errors } = recordings

    const mui = translations.strings.recording
    const emui = mui.edit

    const onConfirmRemove = (): void => {
        recordings.deleteConfirm = true
    }

    const onCancel = (): void => {
        recordings.workingCopy.reset()
    }

    const onCopy = async (): Promise<void> => {
        recordings.createCopy()
    }

    const onSaveAndBack = async (): Promise<void> => {
        if (await recordings.addOrUpdate()) {
            goto(recordings.itemRoute)
        }
    }

    const onSaveAndCopy = async (): Promise<void> => {
        if (await recordings.addOrUpdate()) {
            recordings.createCopy()
        }
    }

    const setSeries = (_ev: React.SyntheticEvent<HTMLElement>, data: DropdownProps): void => {
        recordings.workingCopy.series = (typeof data.value === 'string' ? data.value : '') || undefined
    }

    const setContainer = (_ev: React.SyntheticEvent<HTMLElement>, data: DropdownProps): void => {
        recordings.workingCopy.containerId = (typeof data.value === 'string' ? data.value : '') || undefined
    }

    const setType = (_ev: React.SyntheticEvent<HTMLElement>, data: DropdownProps): void => {
        recordings.workingCopy.containerType = data.value as TRecordingContainerType
    }

    const setGenres = (_ev: React.SyntheticEvent<HTMLElement>, data: DropdownProps): void => {
        recordings.workingCopy.genres = Array.isArray(data.value) ? (data.value as string[]) : []
    }

    const setLanguages = (_ev: React.SyntheticEvent<HTMLElement>, data: DropdownProps): void => {
        recordings.workingCopy.languages = Array.isArray(data.value) ? (data.value as string[]) : []
    }

    React.useEffect(() => {
        recordings.load(id)
    }, [id])

    return (
        <div className='movie-db-recording-edit'>
            <DeleteConfirm scope='recording' store={recordings} />
            <div>
                <Button disabled={!workingCopy.isDirty} onClick={onCancel}>
                    {workingCopy._id ? translations.strings.reset : translations.strings.cancel}
                </Button>
                <Button disabled={errors !== true || !workingCopy.isDirty} onClick={onSaveAndBack}>
                    {mui.saveAndBack}
                </Button>
                <Button disabled={errors !== true || !workingCopy.isDirty} onClick={onSaveAndCopy}>
                    {mui.saveAndCopy}
                </Button>
                {workingCopy._id && <Button onClick={onCopy}>{mui.createCopy}</Button>}
                {workingCopy._id && <Button onClick={onConfirmRemove}>{translations.strings.remove}</Button>}
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
                        onChange={setSeries}
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
                        onChange={setType}
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
                        onChange={setGenres}
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
                        onChange={setLanguages}
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
                        onChange={setContainer}
                    />
                </Form.Field>
                <TextInput<IRecording> prop='containerPosition' scope='recording' store={recordings} />
                <TextInput<IRecording> prop='rentTo' scope='recording' store={recordings} />
            </Form>
        </div>
    )
})
