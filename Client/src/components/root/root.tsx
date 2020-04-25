import { IMuiString } from '@jms-1/isxs-validation'
import { observer } from 'mobx-react'
import * as React from 'react'
import { Route } from 'react-router'
import { Dimmer, Dropdown, Header, Loader, Menu, Message } from 'semantic-ui-react'

import { ContainerRoute } from '../../routes/container/container'
import { GenreRoute } from '../../routes/genre/genre'
import { LanguageRoute } from '../../routes/language/language'
import { Recording } from '../../routes/recording/details/details'
import { RecordingRoute } from '../../routes/recording/recording'
import { SeriesRoute } from '../../routes/series/series'
import { rootStore, translations } from '../../stores'
import { routes } from '../../stores/routes'

export interface IRootUiProps {}

export interface IRootProps {
    errors: IMuiString[]
    theme: string
}

export interface IRootActions {
    clearErrors(): void
    setTheme(theme: string): void
}

export type TRootProps = IRootProps & IRootUiProps & IRootActions

@observer
export class CRoot extends React.PureComponent<TRootProps> {
    render(): JSX.Element {
        const { isBusy } = rootStore

        const tmui = translations.strings.themes
        const rmui = translations.strings.routes
        const cmui = rmui.create

        const { errors, theme } = this.props

        const path = rootStore.router.location.pathname

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
                <Dimmer page active={isBusy || errors.length > 0}>
                    <Loader disabled={!isBusy} />
                    <Message negative hidden={errors.length < 1} onDismiss={this.props.clearErrors}>
                        <Header>{translations.strings.webError}</Header>
                        <Message.List>
                            {errors.map((e, i) => (
                                <Message.Item key={i}>{e.de || e.en || 'failed'}</Message.Item>
                            ))}
                        </Message.List>
                    </Message>
                </Dimmer>
                <Menu borderless>
                    <Menu.Item active={recording} as='a' href={`#${routes.recording}`}>
                        {rmui.recording}
                    </Menu.Item>
                    <Menu.Item active={series} as='a' href={`#${routes.series}`}>
                        {rmui.series}
                    </Menu.Item>
                    <Menu.Item active={container} as='a' href={`#${routes.container}`}>
                        {rmui.container}
                    </Menu.Item>
                    <Menu.Item active={language} as='a' href={`#${routes.language}`}>
                        {rmui.language}
                    </Menu.Item>
                    <Menu.Item active={genre} as='a' href={`#${routes.genre}`}>
                        {rmui.genre}
                    </Menu.Item>
                    <Menu.Item active={create}>
                        <Dropdown text={cmui.title}>
                            <Dropdown.Menu>
                                <Dropdown.Item active={createRecording} as='a' href={`#${routes.recording}/NEW`}>
                                    {cmui.recording}
                                </Dropdown.Item>
                                <Dropdown.Item active={createSeries} as='a' href={`#${routes.series}/NEW`}>
                                    {cmui.series}
                                </Dropdown.Item>
                                <Dropdown.Item active={createContainer} as='a' href={`#${routes.container}/NEW`}>
                                    {cmui.container}
                                </Dropdown.Item>
                                <Dropdown.Item active={createLanguage} as='a' href={`#${routes.language}/NEW`}>
                                    {cmui.language}
                                </Dropdown.Item>
                                <Dropdown.Item active={createGenre} as='a' href={`#${routes.genre}/NEW`}>
                                    {cmui.genre}
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                    <Menu.Item>
                        <Dropdown text={tmui.title}>
                            <Dropdown.Menu>
                                <Dropdown.Item active={theme === 'default'} onClick={this.defaultTheme}>
                                    {tmui.default}
                                </Dropdown.Item>
                                <Dropdown.Item active={theme === 'alternate.1'} onClick={this.alternateTheme1}>
                                    {tmui.theme1}
                                </Dropdown.Item>
                                <Dropdown.Item active={theme === 'alternate.2'} onClick={this.alternateTheme2}>
                                    {tmui.theme2}
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                </Menu>
                <div className='content'>
                    <Route exact component={RecordingRoute} path='/' />
                    <Route component={ContainerRoute} path={`${routes.container}/:id?`} />
                    <Route component={GenreRoute} path={`${routes.genre}/:id?`} />
                    <Route component={LanguageRoute} path={`${routes.language}/:id?`} />
                    <Route component={Recording} path={`${routes.recording}/:id`} />
                    <Route component={SeriesRoute} path={`${routes.series}/:id?`} />
                    <Route exact component={RecordingRoute} path={routes.recording} />
                </div>
            </div>
        )
    }

    private readonly defaultTheme = (): void => this.props.setTheme('default')

    private readonly alternateTheme1 = (): void => this.props.setTheme('alternate.1')

    private readonly alternateTheme2 = (): void => this.props.setTheme('alternate.2')
}
