import { observer } from 'mobx-react'
import * as React from 'react'
import { Icon, Input, InputOnChangeData } from 'semantic-ui-react'

import { translations } from '../../stores'

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
