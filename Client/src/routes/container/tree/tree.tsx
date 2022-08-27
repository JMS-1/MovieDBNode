// eslint-disable-next-line unused-imports/no-unused-imports-ts
import { observer } from 'mobx-react'
import * as React from 'react'

import { IContainer } from '../../../../../Server/src/model/client'
import { Search } from '../../../components/search/search'
import { Node } from '../../../components/tree/level'
import { containers } from '../../../stores'

export interface IContainerTreeUiProps {
    id: string | undefined
}

export interface IContainerTreeProps {}

export interface IContainerTreeActions {}

export type TContainerTreeProps = IContainerTreeProps & IContainerTreeUiProps & IContainerTreeActions

@observer
export class ContainerTree extends React.PureComponent<TContainerTreeProps> {
    render(): JSX.Element {
        return (
            <div className='movie-db-container-tree movie-db-tree'>
                <Search store={containers} />
                <Node<IContainer> id='' scope={this.props.id} store={containers} />
            </div>
        )
    }
}
