import * as React from 'react'
import { Dropdown, DropdownItemProps, DropdownProps, Form } from 'semantic-ui-react'

import { ISeries } from 'movie-db-api'

import { ConfirmDeleteSeries } from '../../../components/confirm/confirmRedux'
import { SeriesDetailActions } from '../../../components/detailActions/actionsRedux'
import { SeriesTextInput } from '../../../components/textInput/textInputRedux'

export interface ISeriesDetailsUiProps {
    id: string
}

export interface ISeriesDetailsProps {
    hasError: boolean
    lost: boolean
    parent: string
    parentHint: string
    parentLabel: string
    parentOptions: DropdownItemProps[]
}

export interface ISeriesDetailsActions {
    loadDetails(id: string): void
    setProp<TProp extends keyof ISeries>(prop: TProp, value: ISeries[TProp]): void
}

export type TSeriesDetailsProps = ISeriesDetailsProps & ISeriesDetailsUiProps & ISeriesDetailsActions

export class CSeriesDetails extends React.PureComponent<TSeriesDetailsProps> {
    render(): JSX.Element {
        if (this.props.lost) {
            return null
        }

        return (
            <div className='movie-db-series-details'>
                <ConfirmDeleteSeries />
                <SeriesDetailActions />
                <Form error={this.props.hasError}>
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
