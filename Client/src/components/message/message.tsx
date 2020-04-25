import { observer } from 'mobx-react'
import * as React from 'react'
import { Header, Message } from 'semantic-ui-react'

import { translations } from '../../stores'

export interface IReportErrorUiProps {
    errors: string[]
}

@observer
export class ReportError extends React.PureComponent<IReportErrorUiProps> {
    render(): JSX.Element {
        const { errors } = this.props

        if (!errors) {
            return null
        }

        return (
            <Message error className='movie-db-input-message'>
                <Header>{translations.strings.validationError}</Header>
                <Message.List>
                    {errors.map((e, i) => (
                        <Message.Item key={i}>{e}</Message.Item>
                    ))}
                </Message.List>
            </Message>
        )
    }
}
