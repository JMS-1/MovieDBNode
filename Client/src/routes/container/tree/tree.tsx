import * as React from 'react'

import { ContainerSearch } from '../../../components/search/searchRedux'
import { ContainerNode } from '../../../components/tree/levelRedux'

export interface IContainerTreeUiProps {
    id: string
}

export interface IContainerTreeProps {}

export interface IContainerTreeActions {}

export type TContainerTreeProps = IContainerTreeProps & IContainerTreeUiProps & IContainerTreeActions

export class CContainerTree extends React.PureComponent<TContainerTreeProps> {
    render(): JSX.Element {
        return (
            <div className='movie-db-container-tree movie-db-tree'>
                <ContainerSearch />
                <ContainerNode scope='' detail={this.props.id} />
            </div>
        )
    }
}
