import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './details'

import * as controller from '../../../controller'

function mapStateToProps(state: IClientState, props: local.IContainerDetailsUiProps): local.IContainerDetailsProps {
    const mui = state.mui.container
    const emui = mui.edit
    const route = state.container
    const container = controller.getContainerEdit(state)
    const errors = route.validation

    return {
        hasError: errors && errors.length > 0,
        idLabel: emui._id,
        lost: !container,
        parent:
            controller.getFullContainerName(container && container.parentId, controller.getContainerMap(state)) ||
            mui.noParent,
        parentLabel: emui.parentId,
        type: container ? container.type : undefined,
        typeError: controller.getError(errors, 'type', container),
        typeLabel: emui.type,
        typeOptions: controller.getContainerTypeOptions(state),
    }
}

function mapDispatchToProps(
    dispatch: Dispatch<Action>,
    props: local.IContainerDetailsUiProps,
): local.IContainerDetailsActions {
    return {
        loadDetails: id => dispatch(controller.ContainerActions.select(id)),
        setProp: (prop, value) => dispatch(controller.ContainerActions.setProperty(prop, value)),
    }
}

export const ContainerDetails = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CContainerDetails)
