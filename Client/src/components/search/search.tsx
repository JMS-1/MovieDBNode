import { observer } from 'mobx-react'
import * as React from 'react'
import { Icon, Input, InputOnChangeData } from 'semantic-ui-react'

import { translations } from '../../stores'

export interface ILegacySearchUiProps {
    fluid?: boolean
}

export interface ILegacySearchProps {
    hint: string
    text: string
}

export interface ILegacySearchActions {
    setText(text: string): void
}

export type TLegacySearchProps = ILegacySearchProps & ILegacySearchUiProps & ILegacySearchActions

export class CLegacySearch extends React.PureComponent<TLegacySearchProps> {
    render(): JSX.Element {
        const { text } = this.props

        return (
            <Input
                icon
                className='movie-db-search'
                fluid={this.props.fluid}
                placeholder={this.props.hint}
                value={text}
                onChange={this.setFilter}
            >
                <input />
                <Icon link name={text ? 'close' : 'search'} onClick={this.clearFilter} />
            </Input>
        )
    }

    private readonly setFilter = (ev: React.ChangeEvent<HTMLInputElement>): void =>
        this.props.setText(ev.currentTarget.value)

    private readonly clearFilter = (): void => this.props.setText('')
}

interface ISearchStore {
    filter: string
}

interface ISearchProps {
    fluid?: boolean
    store: ISearchStore
}

@observer
export class Search extends React.PureComponent<ISearchProps> {
    render(): JSX.Element {
        const { store } = this.props

        return (
            <Input
                icon
                className='movie-db-search'
                fluid={this.props.fluid}
                placeholder={translations.strings.search}
                value={store.filter || ''}
                onChange={this.setFilter}
            >
                <input />
                <Icon link name={store.filter ? 'close' : 'search'} onClick={this.clearFilter} />
            </Input>
        )
    }

    private readonly setFilter = (_ev: React.ChangeEvent, data: InputOnChangeData): void => {
        this.props.store.filter = data.value
    }

    private readonly clearFilter = (): void => {
        this.props.store.filter = ''
    }
}
