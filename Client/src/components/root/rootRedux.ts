import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './root'

import { ApplicationActions } from '../../controller'

function mapStateToProps(state: IClientState, props: local.IRootUiProps): local.IRootProps {
    const mui = state.mui.routes
    const cmui = mui.create
    const tmui = state.mui.themes
    const route = state.application

    return {
        alternateTheme1: tmui.theme1,
        busy: route.requests > 0,
        containerRoute: mui.container,
        createContainer: cmui.container,
        createGenre: cmui.genre,
        createLanguage: cmui.language,
        createRecording: cmui.recording,
        createRoute: cmui.title,
        createSeries: cmui.series,
        defaultTheme: tmui.default,
        errors: route.errors,
        genreRoute: mui.genre,
        alternateTheme2: tmui.theme2,
        languageRoute: mui.language,
        path: state.router.location.pathname,
        recordingRoute: mui.recording,
        seriesRoute: mui.series,
        theme: state.application.theme,
        themeTitle: tmui.title,
        title: state.mui.webError,
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>, props: local.IRootUiProps): local.IRootActions {
    return {
        clearErrors: () => dispatch(ApplicationActions.clearErrors()),
        setTheme: theme => dispatch(ApplicationActions.setTheme(theme)),
    }
}

export const Root = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CRoot)
