import { computed } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import { Icon, Label, List, SemanticICONS } from 'semantic-ui-react'

import { routes } from '../../stores/routes'

interface INodeItem {
    readonly _id: string
    readonly parentId?: string
}

interface INodeStore<TItem extends INodeItem> {
    getIcon?(item: TItem): SemanticICONS
    getItem(id: string): TItem | undefined
    getName(item: TItem): string
    readonly childTree: Record<string, Set<string>>
    readonly filter: string
    readonly itemRoute: routes
    readonly orderedAndFiltered: string[]
}

interface INodeProps<TItem extends INodeItem> {
    id: string
    scope: string
    store: INodeStore<TItem>
}

const emptySet = new Set<string>()

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

        const children = store.childTree[this.props.id || ''] || emptySet

        return store.orderedAndFiltered
            .filter(children.has.bind(children))
            .map((id) => <Node<TItem> key={id} id={id} scope={scope} store={store} />)
    }
}
