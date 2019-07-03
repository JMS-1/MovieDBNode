import * as React from 'react'
import { Button, Form, Icon, Input, TextArea } from 'semantic-ui-react'

import { IRecordingLink } from 'movie-db-api'

import { ReportError } from '../../../components/message/messageRedux'

export interface IRecordingLinksUiProps {}

export type lookupErrors = (index: number, prop: keyof IRecordingLink) => string[]

export interface IRecordingLinksProps {
    deleteLabel: string
    description: string
    errors: string[]
    getErrors: lookupErrors
    label: string
    links: IRecordingLink[]
    name: string
    url: string
}

export interface IRecordingLinksActions {
    setLinks(links: IRecordingLink[]): void
}

export type TRecordingLinksProps = IRecordingLinksProps & IRecordingLinksUiProps & IRecordingLinksActions

interface IRecordingLinksState {
    edit: boolean
    selected: number
}

interface IEditButtonProps {
    selected: boolean
    description: string
    index: number
    name: string
    select(index: number): void
}

class EditButton extends React.PureComponent<IEditButtonProps> {
    render(): JSX.Element {
        return (
            <Button title={this.props.description} active={this.props.selected} onClick={this.onClick}>
                {this.props.name || <>&nbsp;</>}
            </Button>
        )
    }

    private readonly onClick = (): void => this.props.select(this.props.index)
}

export class CRecordingLinks extends React.PureComponent<TRecordingLinksProps, IRecordingLinksState> {
    render(): JSX.Element {
        const { edit, selected } = this.state
        const { links, getErrors } = this.props

        const nameErrors = getErrors(selected, 'name')
        const hasNameError = nameErrors && nameErrors.length > 0
        const urlErrors = getErrors(selected, 'url')
        const hasUrlError = urlErrors && urlErrors.length > 0
        const descriptionErrors = getErrors(selected, 'description')
        const hasDescriptionError = descriptionErrors && descriptionErrors.length > 0

        const link = links[selected]

        return (
            <Form.Field className={this.className}>
                <label>
                    {this.props.label}
                    <Icon name={edit ? 'eye' : 'edit'} link onClick={this.toggleEdit} />
                    {edit && <Icon name='add' link onClick={this.addLink} />}
                </label>
                {edit && link ? (
                    <>
                        <div>
                            {links.map((l, i) => (
                                <EditButton
                                    description={l.description}
                                    index={i}
                                    key={i}
                                    name={l.name}
                                    select={this.select}
                                    selected={i === selected}
                                />
                            ))}
                        </div>
                        <div className='link-edit'>
                            <Form.Field required error={hasNameError}>
                                <label>{this.props.name}</label>
                                <Input input='text' onChange={this.setName} value={(link && link.name) || ''} />
                                <ReportError errors={nameErrors} />
                            </Form.Field>
                            <Form.Field required error={hasUrlError}>
                                <label>{this.props.url}</label>
                                <Input input='text' onChange={this.setUrl} value={(link && link.url) || ''} />
                                <ReportError errors={urlErrors} />
                            </Form.Field>
                            <Form.Field error={hasDescriptionError}>
                                <label>{this.props.description}</label>
                                <TextArea onChange={this.setDescription} value={(link && link.description) || ''} />
                                <ReportError errors={descriptionErrors} />
                            </Form.Field>
                            <Button onClick={this.delLink}>{this.props.deleteLabel}</Button>
                        </div>
                    </>
                ) : (
                    <div>
                        {links.map((l, i) => (
                            <Button as='a' key={i} title={l.description} href={l.url} target='_blank'>
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

        const { errors } = this.props

        if (errors && errors.length > 0) {
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
        const links = [...this.props.links, { name: '', url: '' }]

        this.props.setLinks(links)

        this.setState({ selected: links.length - 1 })
    }

    private readonly delLink = (): void => {
        const links = [...this.props.links]

        links.splice(this.state.selected, 1)

        this.props.setLinks(links)

        this.setState({ selected: 0 })
    }

    private setProp<TProp extends keyof IRecordingLink>(prop: TProp, value: IRecordingLink[TProp]): void {
        const links = [...this.props.links]

        let { selected } = this.state
        let edit = links[selected]

        if (!edit) {
            selected = links.length
            edit = { name: '', url: '' }

            links.push(edit)

            this.setState({ selected })
        }

        if (edit[prop] === value) {
            return
        }

        links[selected] = { ...edit, [prop]: value }

        this.props.setLinks(links)
    }

    componentWillMount(): void {
        this.setState({ edit: false, selected: 0 })
    }
}
