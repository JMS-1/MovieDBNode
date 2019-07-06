import * as React from 'react'
import { Button } from 'semantic-ui-react'

export interface IDetailActionsUiProps {}

export interface IDetailActionsProps {
    cancelLabel: string
    deleteLabel: string
    hasChanges: boolean
    hasError: boolean
    saveLabel: string
    showDelete: boolean
}

export interface IDetailActionsActions {
    cancel(): void
    confirmDelete(): void
    save(): void
}

export type TDetailActionsProps = IDetailActionsProps & IDetailActionsUiProps & IDetailActionsActions

export class CDetailActions extends React.PureComponent<TDetailActionsProps> {
    render(): JSX.Element {
        const { hasChanges } = this.props

        return (
            <div className='movie-db-detail-actions'>
                <Button onClick={this.props.cancel} disabled={!hasChanges}>
                    {this.props.cancelLabel}
                </Button>
                <Button onClick={this.props.save} disabled={this.props.hasError || !hasChanges}>
                    {this.props.saveLabel}
                </Button>
                {this.props.showDelete && <Button onClick={this.props.confirmDelete}>{this.props.deleteLabel}</Button>}
            </div>
        )
    }
}
