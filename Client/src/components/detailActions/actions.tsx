import { ValidationError } from 'fastest-validator'
import { observer } from 'mobx-react'
import { IViewModel } from 'mobx-utils'
import * as React from 'react'
import { Button } from 'semantic-ui-react'

import { translations } from '../../stores'

export interface IDetailActionsLegacyUiProps {}

export interface IDetailActionsLegacyProps {
    cancelLabel: string
    deleteLabel: string
    hasChanges: boolean
    hasError: boolean
    saveLabel: string
    showDelete: boolean
}

export interface IDetailActionsLegacyActions {
    cancel(): void
    confirmDelete(): void
    save(): void
}

export type TDetailActionsLegacyProps = IDetailActionsLegacyProps &
    IDetailActionsLegacyUiProps &
    IDetailActionsLegacyActions

export class CDetailActionsLegacy extends React.PureComponent<TDetailActionsLegacyProps> {
    render(): JSX.Element {
        const { hasChanges } = this.props

        return (
            <div className='movie-db-detail-actions'>
                <Button disabled={!hasChanges} onClick={this.props.cancel}>
                    {this.props.cancelLabel}
                </Button>
                <Button disabled={this.props.hasError || !hasChanges} onClick={this.props.save}>
                    {this.props.saveLabel}
                </Button>
                {this.props.showDelete && <Button onClick={this.props.confirmDelete}>{this.props.deleteLabel}</Button>}
            </div>
        )
    }
}

interface IDetailActionsStoreItem {
    _id: string
}

interface IDetailActionsStore<TItem extends IDetailActionsStoreItem> {
    addOrUpdate(): Promise<void>
    deleteConfirm: boolean
    errors: true | ValidationError[]
    workingCopy: TItem & IViewModel<TItem>
}

interface IDetailActionsProps<TItem extends IDetailActionsStoreItem> {
    store: IDetailActionsStore<TItem>
}

@observer
export class DetailActions<TItem extends IDetailActionsStoreItem> extends React.PureComponent<
    IDetailActionsProps<TItem>
> {
    render(): JSX.Element {
        const { store } = this.props

        const mui = translations.strings

        const hasChanges = store.workingCopy.isDirty

        return (
            <div className='movie-db-detail-actions'>
                <Button disabled={!hasChanges} onClick={this.onCancel}>
                    {store.workingCopy._id ? mui.reset : mui.cancel}
                </Button>
                <Button disabled={store.errors !== true || !hasChanges} onClick={this.onSave}>
                    {mui.save}
                </Button>
                {store.workingCopy._id && <Button onClick={this.onConfirmRemove}>{mui.remove}</Button>}
            </div>
        )
    }

    private readonly onSave = (): Promise<void> => this.props.store.addOrUpdate()

    private readonly onCancel = (): void => this.props.store.workingCopy.reset()

    private readonly onConfirmRemove = (): void => {
        this.props.store.deleteConfirm = true
    }
}
