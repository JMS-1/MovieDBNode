import * as React from 'react'

export interface IContainerTreeUiProps {}

export interface IContainerTreeProps {}

export interface IContainerTreeActions {}

export type TContainerTreeProps = IContainerTreeProps & IContainerTreeUiProps & IContainerTreeActions

export class CContainerTree extends React.PureComponent<TContainerTreeProps> {
    render(): JSX.Element {
        return <div className='movie-db-container-tree'>[TREE]</div>
    }
}
