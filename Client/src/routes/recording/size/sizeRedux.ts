import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './size'

import { RecordingActions } from '../../../controller'

function mapStateToProps(state: IClientState, props: local.IPageSizeSelectorUiProps): local.IPageSizeSelectorProps {
    return {
        currentSize: state.recording.pageSize,
    }
}

function mapDispatchToProps(
    dispatch: Dispatch<Action>,
    props: local.IPageSizeSelectorUiProps,
): local.IPageSizeSelectorActions {
    return {
        select: () => dispatch(RecordingActions.setPageSize(props.size)),
    }
}

export const PageSizeSelector = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CPageSizeSelector)
