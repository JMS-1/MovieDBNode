// eslint-disable-next-line unused-imports/no-unused-imports-ts
import { observer } from 'mobx-react'
import * as React from 'react'
import { Button, Form, Icon, Input, TextArea } from 'semantic-ui-react'

import { ILink } from '../../../../../Server/src/model/client'
import { ReportError } from '../../../components/message/message'
import { recordings, translations } from '../../../stores'

export interface IRecordingLinksUiProps {}

interface IRecordingLinksState {
    edit: boolean
    selected: number
}

interface IEditButtonProps {
    description: string | undefined
    index: number
    name: string
    select(index: number): void
    selected: boolean
}

@observer
class EditButton extends React.PureComponent<IEditButtonProps> {
    render(): JSX.Element {
        return (
            <Button active={this.props.selected} title={this.props.description} onClick={this.onClick}>
                {this.props.name || <>&nbsp;</>}
            </Button>
        )
    }

    private readonly onClick = (): void => this.props.select(this.props.index)
}

@observer
export class RecordingLinks extends React.PureComponent<IRecordingLinksUiProps, IRecordingLinksState> {
    render(): JSX.Element {
        const { edit, selected } = this.state
        const { workingCopy } = recordings

        const links = workingCopy.links || []

        const nameErrors = recordings.getErrors('links', selected, 'name')
        const hasNameError = nameErrors && nameErrors.length > 0
        const urlErrors = recordings.getErrors('links', selected, 'url')
        const hasUrlError = urlErrors && urlErrors.length > 0
        const descriptionErrors = recordings.getErrors('links', selected, 'description')
        const hasDescriptionError = descriptionErrors && descriptionErrors.length > 0

        const link = selected < links.length && links[selected]

        const mui = translations.strings.recording
        const emui = mui.linkEdit

        return (
            <Form.Field className={this.className}>
                <label>
                    {mui.edit.links}
                    <Icon link name={edit ? 'eye' : 'edit'} onClick={this.toggleEdit} />
                    {edit && <Icon link name='add' onClick={this.addLink} />}
                </label>
                {edit && link ? (
                    <>
                        <div>
                            {links.map((l, i) => (
                                <EditButton
                                    key={i}
                                    description={l.description}
                                    index={i}
                                    name={l.name}
                                    select={this.select}
                                    selected={i === selected}
                                />
                            ))}
                        </div>
                        <div className='link-edit'>
                            <Form.Field required error={hasNameError}>
                                <label>{emui.name}</label>
                                <Input input='text' value={(link && link.name) || ''} onChange={this.setName} />
                                <ReportError errors={nameErrors} />
                            </Form.Field>
                            <Form.Field required error={hasUrlError}>
                                <label>{emui.url}</label>
                                <Input input='text' value={(link && link.url) || ''} onChange={this.setUrl} />
                                <ReportError errors={urlErrors} />
                            </Form.Field>
                            <Form.Field error={hasDescriptionError}>
                                <label>{emui.description}</label>
                                <TextArea
                                    rows={6}
                                    value={(link && link.description) || ''}
                                    onChange={this.setDescription}
                                />
                                <ReportError errors={descriptionErrors} />
                            </Form.Field>
                            <Button onClick={this.delLink}>{translations.strings.remove}</Button>
                        </div>
                    </>
                ) : (
                    <div>
                        {links.map((l, i) => (
                            <Button key={i} as='a' href={l.url} target='_blank' title={l.description}>
                                {l.name || <>&nbsp;</>}
                            </Button>
                        ))}
                    </div>
                )}
            </Form.Field>
        )
    }

    private get className(): string {
        let className = 'movie-db-container-links'

        const { errors } = recordings

        if (errors !== true && errors.some((e) => (e.field || '').match(/^links(\[\d+\].*)?$/))) {
            className += ' link-errors'
        }

        return className
    }

    private readonly toggleEdit = (): void => this.setState({ edit: !this.state.edit })

    private readonly select = (selected: number): void => this.setState({ selected })

    private readonly setName = (ev: React.ChangeEvent<HTMLInputElement>): void =>
        this.setProp('name', ev.currentTarget.value)

    private readonly setDescription = (ev: React.FormEvent<HTMLTextAreaElement>): void =>
        this.setProp('description', ev.currentTarget.value)

    private readonly setUrl = (ev: React.ChangeEvent<HTMLInputElement>): void =>
        this.setProp('url', ev.currentTarget.value)

    private readonly addLink = (): void => {
        const { workingCopy } = recordings

        const links = [...(workingCopy.links || []), { description: undefined, name: '', url: '' }]

        workingCopy.links = links

        this.setState({ selected: links.length - 1 })
    }

    private readonly delLink = (): void => {
        const { workingCopy } = recordings

        const links = [...(workingCopy.links || [])]

        links.splice(this.state.selected, 1)

        workingCopy.links = links

        this.setState({ selected: 0 })
    }

    private setProp<TProp extends keyof ILink>(prop: TProp, value: ILink[TProp]): void {
        const { workingCopy } = recordings

        const links = [...(workingCopy.links || [])]

        let { selected } = this.state
        let edit = links[selected]

        if (!edit) {
            selected = links.length
            edit = { description: undefined, name: '', url: '' }

            links.push(edit)

            this.setState({ selected })
        }

        if (edit[prop] === value) {
            return
        }

        links[selected] = { ...edit, [prop]: value }

        workingCopy.links = links
    }

    UNSAFE_componentWillMount(): void {
        this.setState({ edit: false, selected: 0 })
    }
}
