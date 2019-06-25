import * as React from 'react'
import { Icon, Label, List, SemanticICONS } from 'semantic-ui-react'

import { containerType } from 'movie-db-api'

export interface IContainerNodeUiProps {
    detail: string
    scope: string
}

export interface IContainerNodeProps {
    name: string
    type: containerType
    list: JSX.Element[]
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
                        <Icon name={this.icon} />
                        {name}
                    </Label>
                )}
                {this.props.list}
            </List>
        )
    }

    private get icon(): SemanticICONS {
        switch (this.props.type) {
            case containerType.Box:
                return 'zip'
            case containerType.Disk:
                return 'hdd'
            case containerType.FeatureSet:
                return 'briefcase'
            case containerType.Folder:
                return 'folder'
            case containerType.Shelf:
                return 'building'
            default:
                return 'help'
        }
    }
}
