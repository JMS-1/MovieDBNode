import * as React from 'react'
import { Header, Message } from 'semantic-ui-react'

export interface IReportErrorUiProps {
    errors: string[]
}

export interface IReportErrorProps {
    title: string
}

export interface IReportErrorActions {}

export type TReportErrorProps = IReportErrorProps & IReportErrorUiProps & IReportErrorActions

export class CReportError extends React.PureComponent<TReportErrorProps> {
    render(): JSX.Element {
        const { errors } = this.props

        if (!errors) {
            return null
        }

        return (
            <Message className='movie-db-input-message' error>
                <Header>{this.props.title}</Header>
                <ul>
                    {errors.map((e, i) => (
                        <li key={i}>{e}</li>
                    ))}
                </ul>
            </Message>
        )
    }
}
