import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'
import { createSelector } from 'reselect'

import { IRecordingLink } from 'movie-db-api'
import { IClientState } from 'movie-db-client'

import * as local from './links'

import { getErrors, getRecordingEdit, RecordingActions } from '../../../controller'

const noLinks: IRecordingLink[] = []

const getLinkErrors = createSelector(
    (state: IClientState) => state.recording.validation,
    (errors): local.lookupErrors => (i, p) => getErrors(errors, new RegExp(`^links\\[${i}\\]\\.${p}$`)),
)

function mapStateToProps(state: IClientState, props: local.IRecordingLinksUiProps): local.IRecordingLinksProps {
    const mui = state.mui.recording
    const emui = mui.linkEdit
    const edit = getRecordingEdit(state)
    const route = state.recording

    return {
        deleteLabel: state.mui.remove,
        description: emui.description,
        errors: getErrors(route.validation, /^links(\[\d+\].*)?$/),
        getErrors: getLinkErrors(state),
        label: mui.edit.links,
        links: (edit && edit.links) || noLinks,
        name: emui.name,
        url: emui.url,
    }
}

function mapDispatchToProps(
    dispatch: Dispatch<Action>,
    props: local.IRecordingLinksUiProps,
): local.IRecordingLinksActions {
    return {
        setLinks: links => dispatch(RecordingActions.setProperty('links', links)),
    }
}

export const RecordingLinks = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CRecordingLinks)
