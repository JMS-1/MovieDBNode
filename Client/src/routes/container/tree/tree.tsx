import { observer } from 'mobx-react'
import * as React from 'react'

// import { ContainerSearch } from '../../../components/search/searchRedux'
import { IContainer } from '../../../../../Server/src/model'
import { Node } from '../../../components/tree/level'
import { containers } from '../../../stores'

export interface IContainerTreeUiProps {
    id: string
}

export interface IContainerTreeProps {}

export interface IContainerTreeActions {}

export type TContainerTreeProps = IContainerTreeProps & IContainerTreeUiProps & IContainerTreeActions

@observer
export class ContainerTree extends React.PureComponent<TContainerTreeProps> {
    render(): JSX.Element {
        return (
            <div className='movie-db-container-tree movie-db-tree'>
                {/* <ContainerSearch /> */}
                <Node<IContainer> id='' scope={this.props.id} store={containers} />
            </div>
        )
    }
}
