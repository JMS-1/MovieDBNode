import * as React from 'react'

import { ContainerNode } from './levelRedux'

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
                <ContainerNode scope='' detail={this.props.detail} />
            </div>
        )
    }
}
