import { routerActions } from 'connected-react-router'
import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './root'

import { ApplicationActions } from '../../controller'

function mapStateToProps(state: IClientState, props: local.IRootUiProps): local.IRootProps {
    const mui = state.mui.routes
    const cmui = mui.create
    const route = state.application

    return {
        busy: route.requests > 0,
        containerRoute: mui.container,
        createContainer: cmui.container,
        createGenre: cmui.genre,
        createLanguage: cmui.language,
        createRecording: cmui.recording,
        createRoute: cmui.title,
        createSeries: cmui.series,
        errors: route.errors,
        genreRoute: mui.genre,
        languageRoute: mui.language,
        path: state.router.location.pathname,
        recordingRoute: mui.recording,
        seriesRoute: mui.series,
        title: state.mui.webError,
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>, props: local.IRootUiProps): local.IRootActions {
    return {
        clearErrors: () => dispatch(ApplicationActions.clearErrors()),
        goto: path => dispatch(routerActions.push(path)),
    }
}

export const Root = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CRoot)
