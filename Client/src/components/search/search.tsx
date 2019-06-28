import * as React from 'react'
import { Icon, Input } from 'semantic-ui-react'

export interface ISearchUiProps {
    fluid?: boolean
}

export interface ISearchProps {
    hint: string
    text: string
}

export interface ISearchActions {
    setText(text: string): void
}

export type TSearchProps = ISearchProps & ISearchUiProps & ISearchActions

export class CSearch extends React.PureComponent<TSearchProps> {
    render(): JSX.Element {
        const { text } = this.props

        return (
            <Input
                className='movie-db-search'
                fluid={this.props.fluid}
                icon
                onChange={this.setFilter}
                placeholder='[TBD]'
                value={text}
            >
                <input />
                <Icon name={text ? 'close' : 'search'} link onClick={this.clearFilter} />
            </Input>
        )
    }

    private readonly setFilter = (ev: React.ChangeEvent<HTMLInputElement>): void =>
        this.props.setText(ev.currentTarget.value)

    private readonly clearFilter = (): void => this.props.setText('')
}
