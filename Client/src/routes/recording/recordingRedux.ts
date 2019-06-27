import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './recording'

import { getRecordings, RecordingActions } from '../../controller'

function mapStateToProps(state: IClientState, props: local.IRecordingRouteUiProps): local.IRecordingRouteProps {
    const mui = state.mui.recording
    const route = state.recording

    return {
        created: mui.created,
        createdSort: route.sort === 'created' ? route.sortOrder : undefined,
        genres: mui.genres,
        languages: mui.languages,
        lastPage: Math.ceil(route.count / route.pageSize),
        list: getRecordings(state),
        name: mui.name,
        nameSort: route.sort === 'fullName' ? route.sortOrder : undefined,
        page: route.page,
    }
}

function mapDispatchToProps(
    dispatch: Dispatch<Action>,
    props: local.IRecordingRouteUiProps,
): local.IRecordingRouteActions {
    return {
        setPage: page => dispatch(RecordingActions.setPage(page)),
        toggleSort: sort => dispatch(RecordingActions.setSort(sort)),
    }
}

export const RecordingRoute = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CRecordingRoute)
