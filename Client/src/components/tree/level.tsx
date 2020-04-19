import { computed } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import { Icon, Label, List, SemanticICONS } from 'semantic-ui-react'

import { routes } from '../../stores/routes'

export interface ILegacyNodeUiProps {
    detail: string
    scope: string
}

export interface ILegacyNodeProps {
    list: JSX.Element[]
    name: string
    route: routes
    type: SemanticICONS
}

export interface ILegacyNodeActions {}

export type TLegacyNodeProps = ILegacyNodeProps & ILegacyNodeUiProps & ILegacyNodeActions

export class CLegacyNode extends React.PureComponent<TLegacyNodeProps> {
    render(): JSX.Element {
        const { name, scope, type } = this.props

        return (
            <List className='movie-db-tree-level'>
                {name && (
                    <Label active={scope === this.props.detail} as='a' href={`#${this.props.route}/${scope}`}>
                        {type && <Icon name={type} />}
                        {name}
                    </Label>
                )}
                {this.props.list}
            </List>
        )
    }
}

interface INodeItem {
    _id: string
    parentId?: string
}

interface INodeStore<TItem extends INodeItem> {
    getIcon?(item: TItem): SemanticICONS
    getItem(id: string): TItem | undefined
    getName(item: TItem): string
    readonly itemRoute: routes
    readonly ordered: string[]
}

interface INodeProps<TItem extends INodeItem> {
    id: string
    scope: string
    store: INodeStore<TItem>
}

@observer
export class Node<TItem extends INodeItem> extends React.PureComponent<INodeProps<TItem>> {
    render(): JSX.Element | null {
        const { store } = this.props

        const item = store.getItem(this.props.id)
        const icon = store.getIcon && store.getIcon(item)

        return (
            <List className='movie-db-tree-level'>
                {item && (
                    <Label active={item._id === this.props.scope} as='a' href={`#${store.itemRoute}/${item._id}`}>
                        {icon && <Icon name={icon} />}
                        {store.getName(item) || item._id}
                    </Label>
                )}
                {this.children}
            </List>
        )
    }

    @computed
    private get children(): JSX.Element[] {
        const { store, scope } = this.props

        const parentId = this.props.id || ''

        return store.ordered
            .map((id) => store.getItem(id))
            .filter((i) => i && (i.parentId || '') === parentId)
            .map((i) => <Node<TItem> key={i._id} id={i._id} scope={scope} store={store} />)
    }
}
