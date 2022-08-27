// eslint-disable-next-line unused-imports/no-unused-imports-ts
import { observer } from 'mobx-react'
import * as React from 'react'
import { Dropdown, DropdownProps, Form } from 'semantic-ui-react'

import { ISeries } from '../../../../../Server/src/model/client'
import { DeleteConfirm } from '../../../components/confirm/confirm'
import { DetailActions } from '../../../components/detailActions/actions'
import { TextInput } from '../../../components/textInput/textInput'
import { series, translations } from '../../../stores'

export interface ISeriesDetailsUiProps {
    id: string | undefined
}

@observer
export class SeriesDetails extends React.PureComponent<ISeriesDetailsUiProps> {
    render(): JSX.Element | null {
        if (!series.selected && this.props.id !== 'NEW') {
            return null
        }

        const { workingCopy } = series

        const mui = translations.strings.series
        const emui = mui.edit

        return (
            <div className='movie-db-series-details'>
                <DeleteConfirm scope='series' store={series} />
                <DetailActions<ISeries> store={series} />
                <Form error={series.errors !== true}>
                    <Form.Field>
                        <label>{emui.parentId}</label>
                        <Dropdown
                            clearable
                            fluid
                            scrolling
                            search
                            selection
                            options={series.possibleParents}
                            placeholder={mui.noParent}
                            value={workingCopy.parentId || ''}
                            onChange={this.setSeries}
                        />
                    </Form.Field>
                    <TextInput<ISeries> required prop='name' scope='series' store={series} />
                    <TextInput<ISeries> textarea prop='description' scope='series' store={series} />
                </Form>
            </div>
        )
    }

    private readonly setSeries = (ev: React.SyntheticEvent<HTMLElement>, data: DropdownProps): void => {
        series.workingCopy.parentId = (typeof data.value === 'string' ? data.value : '') || undefined
    }

    UNSAFE_componentWillMount(): void {
        series.select(this.props.id)
    }

    UNSAFE_componentWillReceiveProps(props: Readonly<ISeriesDetailsUiProps>): void {
        if (props.id !== this.props.id) {
            series.select(props.id)
        }
    }
}
