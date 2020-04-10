import * as React from 'react'

export interface IMasterDetailRouteUiProps {
    children?: React.ReactNode
    className?: string
}

export interface IMasterDetailRouteProps { }

export interface IMasterDetailRouteActions { }

export type TMasterDetailRouteProps = IMasterDetailRouteProps & IMasterDetailRouteUiProps & IMasterDetailRouteActions

export class CMasterDetailRoute extends React.PureComponent<TMasterDetailRouteProps> {
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
