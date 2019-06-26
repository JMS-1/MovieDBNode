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
                <Message.List>
                    {errors.map((e, i) => (
                        <Message.Item key={i}>{e}</Message.Item>
                    ))}
                </Message.List>
            </Message>
        )
    }
}
