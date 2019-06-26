import * as React from 'react'
import { Icon, Label, List, SemanticICONS } from 'semantic-ui-react'

export interface IContainerNodeUiProps {
    detail: string
    scope: string
}

export interface IContainerNodeProps {
    list: JSX.Element[]
    name: string
    type: SemanticICONS
}

export interface IContainerNodeActions {}

export type TContainerNodeProps = IContainerNodeProps & IContainerNodeUiProps & IContainerNodeActions

export class CContainerNode extends React.PureComponent<TContainerNodeProps> {
    render(): JSX.Element {
        const { name, scope } = this.props

        return (
            <List className='movie-db-container-tree-level'>
                {name && (
                    <Label as='a' active={scope === this.props.detail} href={`#/container/${scope}`}>
                        <Icon name={this.props.type} />
                        {name}
                    </Label>
                )}
                {this.props.list}
            </List>
        )
    }
}
