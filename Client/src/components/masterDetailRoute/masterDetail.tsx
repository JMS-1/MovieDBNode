import { observer } from 'mobx-react'
import * as React from 'react'

export interface IMasterDetailRouteUiProps {
    children?: React.ReactNode
    className?: string
}

@observer
export class MasterDetailRoute extends React.PureComponent<IMasterDetailRouteUiProps> {
    render(): JSX.Element {
        const children = React.Children.toArray(this.props.children)

        return (
            <div className={this.className}>
                <div className='master'>{children[0]}</div>
                <div className='details'>{children[1]}</div>
            </div>
        )
    }

    private get className(): string {
        let className = 'movie-db-master-detail-route movie-db-route'

        if (this.props.className) {
            className += ` ${this.props.className}`
        }

        return className
    }
}
