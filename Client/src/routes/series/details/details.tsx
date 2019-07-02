import * as React from 'react'
import { Button, Dropdown, DropdownItemProps, DropdownProps, Form } from 'semantic-ui-react'

import { ISeries } from 'movie-db-api'

import { ConfirmDeleteSeries } from '../../../components/confirm/confirmRedux'
import { SeriesTextInput } from '../../../components/textInput/textInputRedux'

export interface ISeriesDetailsUiProps {
    id: string
}

export interface ISeriesDetailsProps {
    cancelLabel: string
    deleteLabel: string
    hasChanges: boolean
    hasError: boolean
    lost: boolean
    parent: string
    parentHint: string
    parentLabel: string
    parentOptions: DropdownItemProps[]
    saveLabel: string
    showDelete: boolean
}

export interface ISeriesDetailsActions {
    cancel(): void
    confirmDelete(): void
    loadDetails(id: string): void
    save(): void
    setProp<TProp extends keyof ISeries>(prop: TProp, value: ISeries[TProp]): void
}

export type TSeriesDetailsProps = ISeriesDetailsProps & ISeriesDetailsUiProps & ISeriesDetailsActions

export class CSeriesDetails extends React.PureComponent<TSeriesDetailsProps> {
    render(): JSX.Element {
        if (this.props.lost) {
            return null
        }

        const { hasChanges, hasError } = this.props

        return (
            <div className='movie-db-series-details'>
                <ConfirmDeleteSeries />
                <Button.Group>
                    <Button onClick={this.props.cancel} disabled={!hasChanges}>
                        {this.props.cancelLabel}
                    </Button>
                    <Button onClick={this.props.save} disabled={hasError || !hasChanges}>
                        {this.props.saveLabel}
                    </Button>
                    {this.props.showDelete && (
                        <Button onClick={this.props.confirmDelete}>{this.props.deleteLabel}</Button>
                    )}
                </Button.Group>
                <Form error={hasError}>
                    <Form.Field>
                        <label>{this.props.parentLabel}</label>
                        <Dropdown
                            clearable
                            fluid
                            onChange={this.setParent}
                            options={this.props.parentOptions}
                            placeholder={this.props.parentHint}
                            search
                            selection
                            scrolling
                            value={this.props.parent || ''}
                        />
                    </Form.Field>
                    <SeriesTextInput prop='name' required />
                    <SeriesTextInput prop='description' textarea />
                </Form>
            </div>
        )
    }

    private readonly setParent = (ev: React.SyntheticEvent<HTMLElement>, data: DropdownProps): void => {
        this.props.setProp('parentId', (typeof data.value === 'string' ? data.value : '') || undefined)
    }

    componentWillMount(): void {
        this.props.loadDetails(this.props.id)
    }

    componentWillReceiveProps(props: Readonly<TSeriesDetailsProps>, context: any): void {
        if (props.id !== this.props.id) {
            this.props.loadDetails(props.id)
        }
    }
}
