import { observer } from 'mobx-react'
import * as React from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'

import { translations } from '../../stores'

export interface IDeleteConfirmLegacyUiProps {}

export interface IDeleteConfirmLegacyProps {
    html: string
    no: string
    open: boolean
    title: string
    yes: string
}

export interface IDeleteConfirmLegacyActions {
    confirm(): void
    reject(): void
}

export type TDeleteConfirmLegacyProps = IDeleteConfirmLegacyProps &
    IDeleteConfirmLegacyUiProps &
    IDeleteConfirmLegacyActions

export class CDeleteConfirmLegacy extends React.PureComponent<TDeleteConfirmLegacyProps> {
    render(): JSX.Element {
        return (
            <Modal className='movie-db-confirm-delete' open={this.props.open} onClose={this.props.reject}>
                <Header>{this.props.title}</Header>
                <Modal.Content>
                    <div dangerouslySetInnerHTML={{ __html: this.props.html }} />
                    <div className='actions'>
                        <Button onClick={this.props.reject}>{this.props.no}</Button>
                        <Button onClick={this.props.confirm}>{this.props.yes}</Button>
                    </div>
                </Modal.Content>
            </Modal>
        )
    }
}

interface IDeleteConfirmStore {
    deleteConfirm: boolean
    remove(): Promise<void>
}

interface IDeleteConfirmProps {
    scope: 'language' | 'genre' | 'container'
    store: IDeleteConfirmStore
}

@observer
export class DeleteConfirm extends React.PureComponent<IDeleteConfirmProps> {
    render(): JSX.Element {
        const mui = translations.strings

        return (
            <Modal className='movie-db-confirm-delete' open={this.props.store.deleteConfirm} onClose={this.onReject}>
                <Header>{mui.confirm}</Header>
                <Modal.Content>
                    <div dangerouslySetInnerHTML={{ __html: translations.strings[this.props.scope].confirmHtml }} />
                    <div className='actions'>
                        <Button onClick={this.onReject}>{mui.no}</Button>
                        <Button onClick={this.onConfirm}>{mui.yes}</Button>
                    </div>
                </Modal.Content>
            </Modal>
        )
    }

    private readonly onReject = (): void => {
        this.props.store.deleteConfirm = false
    }

    private readonly onConfirm = (): Promise<void> => this.props.store.remove()
}
