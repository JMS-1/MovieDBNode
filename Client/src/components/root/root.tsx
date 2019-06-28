import * as React from 'react'
import { Route } from 'react-router'
import { Dimmer, Header, Loader, Menu, Message } from 'semantic-ui-react'

import { routes } from 'movie-db-client'

import { ContainerRoute } from '../../routes/container/containerRedux'
import { Recording } from '../../routes/recording/details/detailsRedux'
import { RecordingRoute } from '../../routes/recording/recordingRedux'

export interface IRootUiProps {}

export interface IRootProps {
    busy: boolean
    containerRoute: string
    errors: string[]
    path: string
    recordingRoute: string
    title: string
}

export interface IRootActions {
    clearErrors(): void
    goto(path: string): void
}

export type TRootProps = IRootProps & IRootUiProps & IRootActions

export class CRoot extends React.PureComponent<TRootProps> {
    render(): JSX.Element {
        const { errors, busy, path } = this.props
        const container = path.startsWith(routes.container)
        const recording = path.startsWith(routes.recording) || path === '/'

        return (
            <div className='movie-db-root'>
                <Dimmer page active={busy || errors.length > 0}>
                    <Loader disabled={!busy} />
                    <Message negative hidden={errors.length < 1} onDismiss={this.props.clearErrors}>
                        <Header>{this.props.title}</Header>
                        <Message.List>
                            {errors.map((e, i) => (
                                <Message.Item key={i}>{e}</Message.Item>
                            ))}
                        </Message.List>
                    </Message>
                </Dimmer>
                <Menu borderless pointing>
                    <Menu.Item active={recording} onClick={this.gotoRecordings}>
                        {this.props.recordingRoute}
                    </Menu.Item>
                    <Menu.Item active={container} onClick={this.gotoContainer}>
                        {this.props.containerRoute}
                    </Menu.Item>
                </Menu>
                <div className='content'>
                    <Route path={`${routes.container}/:id?`} component={ContainerRoute} />
                    <Route path={`${routes.recording}/:id`} component={Recording} />
                    <Route path={routes.recording} exact component={RecordingRoute} />
                    <Route path='/' exact component={RecordingRoute} />
                </div>
            </div>
        )
    }

    private readonly gotoContainer = (): void => this.props.goto(routes.container)

    private readonly gotoRecordings = (): void => this.props.goto(routes.recording)
}
