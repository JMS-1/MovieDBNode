import * as React from 'react'
import { Icon, Label, List, SemanticICONS } from 'semantic-ui-react'

import { routes } from 'movie-db-client'

export interface INodeUiProps {
    detail: string
    scope: string
}

export interface INodeProps {
    list: JSX.Element[]
    name: string
    route: routes
    type: SemanticICONS
}

export interface INodeActions {}

export type TNodeProps = INodeProps & INodeUiProps & INodeActions

export class CNode extends React.PureComponent<TNodeProps> {
    render(): JSX.Element {
        const { name, scope, type } = this.props

        return (
            <List className='movie-db-tree-level'>
                {name && (
                    <Label as='a' active={scope === this.props.detail} href={`#${this.props.route}/${scope}`}>
                        {type && <Icon name={type} />}
                        {name}
                    </Label>
                )}
                {this.props.list}
            </List>
        )
    }
}
