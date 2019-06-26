import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './details'

import { ContainerActions, getContainerMap, getError } from '../../../controller'

function mapStateToProps(state: IClientState, props: local.IContainerDetailsUiProps): local.IContainerDetailsProps {
    const route = state.container
    const container = route.workingCopy || getContainerMap(state)[route.selected]
    const errors = route.validation

    return {
        description: container && container.description,
        descriptionError: getError(errors, 'description', container),
        location: container && container.parentLocation,
        locationError: getError(errors, 'parentLocation', container),
        lost: !container,
        name: container && container.name,
        nameError: getError(errors, 'name', container),
        parent: container && container.parentId,
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
