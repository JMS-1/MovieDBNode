import { IMuiString } from '@jms-1/isxs-validation'
import * as React from 'react'
import { Route } from 'react-router'
import { Dimmer, Dropdown, Header, Loader, Menu, Message } from 'semantic-ui-react'

import { ContainerRoute } from '../../routes/container/container'
import { GenreRoute } from '../../routes/genre/genre'
import { LanguageRoute } from '../../routes/language/language'
import { routes } from '../../stores/routes'
// import { Recording } from '../../routes/recording/details/detailsRedux'
// import { RecordingRoute } from '../../routes/recording/recordingRedux'
// import { SeriesRoute } from '../../routes/series/seriesRedux'

export interface IRootUiProps {}

export interface IRootProps {
    alternateTheme1: string
    busy: boolean
    containerRoute: string
    createContainer: string
    createGenre: string
    createLanguage: string
    createRecording: string
    createRoute: string
    createSeries: string
    defaultTheme: string
    errors: IMuiString[]
    genreRoute: string
    alternateTheme2: string
    languageRoute: string
    path: string
    recordingRoute: string
    seriesRoute: string
    theme: string
    themeTitle: string
    title: string
}

export interface IRootActions {
    clearErrors(): void
    setTheme(theme: string): void
}

export type TRootProps = IRootProps & IRootUiProps & IRootActions

export class CRoot extends React.PureComponent<TRootProps> {
    render(): JSX.Element {
        const { errors, busy, path, theme } = this.props
        const createContainer = path === `${routes.container}/NEW`
        const createRecording = path === `${routes.recording}/NEW`
        const createSeries = path === `${routes.series}/NEW`
        const createGenre = path === `${routes.genre}/NEW`
        const createLanguage = path === `${routes.language}/NEW`
        const create = createContainer || createRecording || createSeries || createGenre || createLanguage
        const container = path.startsWith(routes.container) && !create
        const genre = path.startsWith(routes.genre) && !create
        const language = path.startsWith(routes.language) && !create
        const recording = (path.startsWith(routes.recording) || path === '/') && !create
        const series = path.startsWith(routes.series) && !create

        return (
            <div className='movie-db-root'>
                <Dimmer page active={busy || errors.length > 0}>
                    <Loader disabled={!busy} />
                    <Message negative hidden={errors.length < 1} onDismiss={this.props.clearErrors}>
                        <Header>{this.props.title}</Header>
                        <Message.List>
                            {errors.map((e, i) => (
                                <Message.Item key={i}>{e.de || e.en || 'failed'}</Message.Item>
                            ))}
                        </Message.List>
                    </Message>
                </Dimmer>
                <Menu borderless>
                    <Menu.Item active={recording} as='a' href={`#${routes.recording}`}>
                        {this.props.recordingRoute}
                    </Menu.Item>
                    <Menu.Item active={series} as='a' href={`#${routes.series}`}>
                        {this.props.seriesRoute}
                    </Menu.Item>
                    <Menu.Item active={container} as='a' href={`#${routes.container}`}>
                        {this.props.containerRoute}
                    </Menu.Item>
                    <Menu.Item active={language} as='a' href={`#${routes.language}`}>
                        {this.props.languageRoute}
                    </Menu.Item>
                    <Menu.Item active={genre} as='a' href={`#${routes.genre}`}>
                        {this.props.genreRoute}
                    </Menu.Item>
                    <Menu.Item active={create}>
                        <Dropdown text={this.props.createRoute}>
                            <Dropdown.Menu>
                                <Dropdown.Item active={createRecording} as='a' href={`#${routes.recording}/NEW`}>
                                    {this.props.createRecording}
                                </Dropdown.Item>
                                <Dropdown.Item active={createSeries} as='a' href={`#${routes.series}/NEW`}>
                                    {this.props.createSeries}
                                </Dropdown.Item>
                                <Dropdown.Item active={createContainer} as='a' href={`#${routes.container}/NEW`}>
                                    {this.props.createContainer}
                                </Dropdown.Item>
                                <Dropdown.Item active={createLanguage} as='a' href={`#${routes.language}/NEW`}>
                                    {this.props.createLanguage}
                                </Dropdown.Item>
                                <Dropdown.Item active={createGenre} as='a' href={`#${routes.genre}/NEW`}>
                                    {this.props.createGenre}
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                    <Menu.Item>
                        <Dropdown text={this.props.themeTitle}>
                            <Dropdown.Menu>
                                <Dropdown.Item active={theme === 'default'} onClick={this.defaultTheme}>
                                    {this.props.defaultTheme}
                                </Dropdown.Item>
                                <Dropdown.Item active={theme === 'alternate.1'} onClick={this.alternateTheme1}>
                                    {this.props.alternateTheme1}
                                </Dropdown.Item>
                                <Dropdown.Item active={theme === 'alternate.2'} onClick={this.alternateTheme2}>
                                    {this.props.alternateTheme2}
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                </Menu>
                <div className='content'>
                    {/* <Route exact component={RecordingRoute} path='/' /> */}
                    <Route component={ContainerRoute} path={`${routes.container}/:id?`} />
                    <Route component={GenreRoute} path={`${routes.genre}/:id?`} />
                    <Route component={LanguageRoute} path={`${routes.language}/:id?`} />
                    {/* <Route component={Recording} path={`${routes.recording}/:id`} /> */}
                    {/* <Route component={SeriesRoute} path={`${routes.series}/:id?`} /> */}
                    {/* <Route exact component={RecordingRoute} path={routes.recording} /> */}
                </div>
            </div>
        )
    }

    private readonly defaultTheme = (): void => this.props.setTheme('default')

    private readonly alternateTheme1 = (): void => this.props.setTheme('alternate.1')

    private readonly alternateTheme2 = (): void => this.props.setTheme('alternate.2')
}
