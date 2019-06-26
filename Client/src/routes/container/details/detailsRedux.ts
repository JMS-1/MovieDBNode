import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './details'

import {
    ContainerActions, getContainerEdit, getContainerMap, getFullContainerName,
} from '../../../controller'

function mapStateToProps(state: IClientState, props: local.IContainerDetailsUiProps): local.IContainerDetailsProps {
    const mui = state.mui.container
    const emui = mui.edit
    const route = state.container
    const container = getContainerEdit(state)
    const errors = route.validation

    return {
        hasError: errors && errors.length > 0,
        idLabel: emui._id,
        lost: !container,
        parent: getFullContainerName(container && container.parentId, getContainerMap(state)) || mui.noParent,
        parentLabel: emui.parentId,
        type: container ? container.type : undefined,
    }
}

function mapDispatchToProps(
    dispatch: Dispatch<Action>,
    props: local.IContainerDetailsUiProps,
): local.IContainerDetailsActions {
    return {
        loadDetails: id => dispatch(ContainerActions.select(id)),
        setProp: (prop, value) => dispatch(ContainerActions.setProperty(prop, value)),
    }
}

export const ContainerDetails = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CContainerDetails)
