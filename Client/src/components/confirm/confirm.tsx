import * as React from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'

export interface IDeleteConfirmUiProps {}

export interface IDeleteConfirmProps {
    html: string
    no: string
    open: boolean
    title: string
    yes: string
}

export interface IDeleteConfirmActions {
    confirm(): void
    reject(): void
}

export type TDeleteConfirmProps = IDeleteConfirmProps & IDeleteConfirmUiProps & IDeleteConfirmActions

export class CDeleteConfirm extends React.PureComponent<TDeleteConfirmProps> {
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
