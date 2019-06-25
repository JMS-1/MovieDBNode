import * as React from 'react'
import { Icon, Input } from 'semantic-ui-react'

import { ContainerNode } from './levelRedux'

export interface IContainerTreeUiProps {
    detail: string
}

export interface IContainerTreeProps {
    filter: string
}

export interface IContainerTreeActions {
    setFilter(filter: string): void
}

export type TContainerTreeProps = IContainerTreeProps & IContainerTreeUiProps & IContainerTreeActions

export class CContainerTree extends React.PureComponent<TContainerTreeProps> {
    render(): JSX.Element {
        return (
            <div className='movie-db-container-tree'>
                <Input onChange={this.setFilter} placeholder='[TBD]' value={this.props.filter} icon>
                    <input />
                    <Icon name='close' link onClick={this.clearFilter} />
                </Input>
                <ContainerNode scope='' detail={this.props.detail} />
            </div>
        )
    }

    private readonly clearFilter = (): void => this.props.setFilter('')

    private readonly setFilter = (ev: React.ChangeEvent<HTMLInputElement>): void =>
        this.props.setFilter(ev.currentTarget.value)
}
