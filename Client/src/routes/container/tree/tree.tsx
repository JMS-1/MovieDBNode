import * as React from 'react'

import { ContainerNode } from './levelRedux'

import { ContainerSearch } from '../../../components/search/searchRedux'

export interface IContainerTreeUiProps {
    detail: string
}

export interface IContainerTreeProps {}

export interface IContainerTreeActions {}

export type TContainerTreeProps = IContainerTreeProps & IContainerTreeUiProps & IContainerTreeActions

export class CContainerTree extends React.PureComponent<TContainerTreeProps> {
    render(): JSX.Element {
        return (
            <div className='movie-db-container-tree'>
                <ContainerSearch />
                <ContainerNode scope='' detail={this.props.detail} />
            </div>
        )
    }
}
