import * as React from 'react'
import { Route } from 'react-router'
import { Dimmer, Header, Loader, Message } from 'semantic-ui-react'

import { ContainerRoute } from '../../routes/container/containerRedux'

export interface IRootUiProps {}

export interface IRootProps {
    busy: boolean
    errors: string[]
    title: string
}

export interface IRootActions {
    clearErrors(): void
}

export type TRootProps = IRootProps & IRootUiProps & IRootActions

export class CRoot extends React.PureComponent<TRootProps> {
    render(): JSX.Element {
        const { errors, busy } = this.props

        return (
            <div className='movie-db-root'>
                <Dimmer page active={busy || errors.length > 0}>
                    <Loader inverted size='massive' disabled={!busy} />
                    <Message negative hidden={errors.length < 1} onDismiss={this.props.clearErrors}>
                        <Header>{this.props.title}</Header>
                        <Message.List>
                            {errors.map((e, i) => (
                                <Message.Item key={i}>{e}</Message.Item>
                            ))}
                        </Message.List>
                    </Message>
                </Dimmer>
                <div className='content'>
                    <Route path='/container/:id?' component={ContainerRoute} />
                </div>
            </div>
        )
    }
}
