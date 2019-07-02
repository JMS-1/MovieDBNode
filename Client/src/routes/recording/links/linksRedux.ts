import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IRecording, IRecordingLink } from 'movie-db-api'
import { IClientState } from 'movie-db-client'

import * as local from './links'

import { getErrors, getRecordingEdit, RecordingActions } from '../../../controller'

const noLinks: IRecordingLink[] = []

function mapStateToProps(state: IClientState, props: local.IRecordingLinksUiProps): local.IRecordingLinksProps {
    const mui = state.mui.recording
    const emui = mui.linkEdit
    const edit = getRecordingEdit(state)
    const route = state.recording

    return {
        deleteLabel: state.mui.remove,
        description: emui.description,
        descriptionErrors: getErrors(route.validation, 'links.description', <any>undefined),
        errors: getErrors(route.validation, 'links', <IRecording>undefined),
        label: mui.edit.links,
        links: (edit && edit.links) || noLinks,
        name: emui.name,
        nameErrors: getErrors(route.validation, 'links.name', <any>undefined),
        url: emui.url,
        urlErrors: getErrors(route.validation, 'links.url', <any>undefined),
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
