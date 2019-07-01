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
        cancelLabel: container && container._id ? state.mui.cancel : state.mui.reset,
        containerHint: mui.noParent,
        containerOptions: controller.getAllContainerOptions(state),
        hasChanges: !!route.workingCopy,
        hasError: errors && errors.length > 0,
        lost: !container,
        parent: container && container.parentId,
        parentLabel: emui.parentId,
        saveLabel: state.mui.save,
        type: container ? container.type : undefined,
        typeErrors: controller.getErrors(errors, 'type', container),
        typeLabel: emui.type,
        typeOptions: controller.getContainerTypeOptions(state),
    }
}

function mapDispatchToProps(
    dispatch: Dispatch<Action>,
    props: local.IContainerDetailsUiProps
): local.IContainerDetailsActions {
    return {
        cancel: () => dispatch(controller.ContainerActions.cancelEdit()),
        loadDetails: id => dispatch(controller.ContainerActions.select(id)),
        save: () => dispatch(controller.ContainerActions.save()),
        setProp: (prop, value) => dispatch(controller.ContainerActions.setProperty(prop, value)),
    }
}

export const ContainerDetails = connect(
    mapStateToProps,
    mapDispatchToProps
)(local.CContainerDetails)
