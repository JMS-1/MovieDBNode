import * as React from 'react'
import { Route } from 'react-router'
import { Dimmer, Dropdown, Header, Loader, Menu, Message } from 'semantic-ui-react'

import { routes } from 'movie-db-client'

import { ContainerRoute } from '../../routes/container/containerRedux'
import { Recording } from '../../routes/recording/details/detailsRedux'
import { RecordingRoute } from '../../routes/recording/recordingRedux'

export interface IRootUiProps {}

export interface IRootProps {
    busy: boolean
    containerRoute: string
    createContainer: string
    createRecording: string
    createRoute: string
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
        const createContainer = path === `${routes.container}/NEW`
        const createRecording = path === `${routes.recording}/NEW`
        const create = createContainer || createRecording
        const container = path.startsWith(routes.container) && !create
        const recording = (path.startsWith(routes.recording) || path === '/') && !create

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
                <Menu borderless>
                    <Menu.Item active={recording} onClick={recording ? undefined : this.gotoRecordings}>
                        {this.props.recordingRoute}
                    </Menu.Item>
                    <Menu.Item active={container} onClick={container ? undefined : this.gotoContainer}>
                        {this.props.containerRoute}
                    </Menu.Item>
                    <Menu.Item active={create}>
                        <Dropdown text={this.props.createRoute}>
                            <Dropdown.Menu>
                                <Dropdown.Item active={createRecording} as='a' href={`#${routes.recording}/NEW`}>
                                    {this.props.createRecording}
                                </Dropdown.Item>
                                <Dropdown.Item active={createContainer} as='a' href={`#${routes.container}/NEW`}>
                                    {this.props.createContainer}
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
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
