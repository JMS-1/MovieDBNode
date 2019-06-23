import * as React from 'react'

export interface IRootUiProps {}

export interface IRootProps {
    title: string
}

export interface IRootActions {}

export type TRootProps = IRootProps & IRootUiProps & IRootActions

export class CRoot extends React.PureComponent<TRootProps> {
    render(): JSX.Element {
        return <div className='vita-root'>{this.props.title}</div>
    }
}
