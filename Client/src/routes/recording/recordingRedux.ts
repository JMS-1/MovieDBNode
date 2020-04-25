import { IClientState } from 'movie-db-client'
import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import * as local from './recording'

import * as controller from '../../controller'

function mapStateToProps(state: IClientState, props: local.IRecordingRouteUiProps): local.IRecordingRouteProps {
    return {
        list: controller.getRecordings(state),
        seriesMap: controller.getSeriesMap(state),
    }
}

function mapDispatchToProps(
    dispatch: Dispatch<Action>,
    props: local.IRecordingRouteUiProps
): local.IRecordingRouteActions {
    return {
        export: () => dispatch(controller.RecordingActions.startExport()),
    }
}

export const RecordingRoute = connect(mapStateToProps, mapDispatchToProps)(local.CRecordingRoute)
