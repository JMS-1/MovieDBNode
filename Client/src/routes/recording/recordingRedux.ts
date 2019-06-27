import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './recording'

import * as controller from '../../controller'

function mapStateToProps(state: IClientState, props: local.IRecordingRouteUiProps): local.IRecordingRouteProps {
    const mui = state.mui.recording
    const route = state.recording

    return {
        createdHeader: mui.created,
        createdSort: route.sort === 'created' ? route.sortOrder : undefined,
        genreHeader: mui.genres,
        genreHint: state.mui.genre.noSelect,
        genreOptions: controller.getGenreOptions(state),
        genres: route.genres,
        language: route.language,
        languageHeader: mui.languages,
        languageHint: state.mui.language.noSelect,
        languageOptions: controller.getLanguageOptions(state),
        lastPage: Math.ceil(route.count / route.pageSize),
        list: controller.getRecordings(state),
        nameHeader: mui.name,
        nameSort: route.sort === 'fullName' ? route.sortOrder : undefined,
        page: route.page,
    }
}

function mapDispatchToProps(
    dispatch: Dispatch<Action>,
    props: local.IRecordingRouteUiProps
): local.IRecordingRouteActions {
    return {
        setGenres: ids => dispatch(controller.RecordingActions.filterGenre(ids)),
        setLanguage: id => dispatch(controller.RecordingActions.filterLanguage(id)),
        setPage: page => dispatch(controller.RecordingActions.setPage(page)),
        toggleSort: sort => dispatch(controller.RecordingActions.setSort(sort)),
    }
}

export const RecordingRoute = connect(
    mapStateToProps,
    mapDispatchToProps
)(local.CRecordingRoute)
