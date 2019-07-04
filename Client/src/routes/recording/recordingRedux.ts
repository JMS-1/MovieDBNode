import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './recording'

import * as controller from '../../controller'

function mapStateToProps(state: IClientState, props: local.IRecordingRouteUiProps): local.IRecordingRouteProps {
    const mui = state.mui.recording
    const route = state.recording

    return {
        clear: mui.clear,
        count: mui.count.replace(/\{count\}/g, `${route.count}`).replace(/\{total\}/g, `${route.total}`),
        createdHeader: mui.created,
        createdSort: route.sort === 'created' ? route.sortOrder : undefined,
        exportLabel: mui.export,
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
        pageSize: route.pageSize,
        rentOptions: controller.getRentOptions(state),
        rentTo: route.rent,
        rentToHint: mui.anyRent,
        series: route.series,
        seriesHint: state.mui.series.noSelect,
        seriesMap: controller.getSeriesMap(state),
        seriesOptions: controller.getSeriesOptions(state),
    }
}

function mapDispatchToProps(
    dispatch: Dispatch<Action>,
    props: local.IRecordingRouteUiProps,
): local.IRecordingRouteActions {
    return {
        clearFilter: () => dispatch(controller.RecordingActions.resetFilter()),
        export: () => dispatch(controller.RecordingActions.startExport()),
        query: () => dispatch(controller.RecordingActions.query()),
        setGenres: ids => dispatch(controller.RecordingActions.filterGenre(ids)),
        setLanguage: id => dispatch(controller.RecordingActions.filterLanguage(id)),
        setPage: page => dispatch(controller.RecordingActions.setPage(page)),
        setPageSize: size => dispatch(controller.RecordingActions.setPageSize(size)),
        setRent: rentTo => dispatch(controller.RecordingActions.filterRentTo(rentTo)),
        setSeries: ids => dispatch(controller.RecordingActions.filterSeries(ids)),
        toggleSort: sort => dispatch(controller.RecordingActions.setSort(sort)),
    }
}

export const RecordingRoute = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CRecordingRoute)
