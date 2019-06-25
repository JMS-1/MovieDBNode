import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './tree'

import { ContainerActions } from '../../../controller'

function mapStateToProps(state: IClientState, props: local.IContainerTreeUiProps): local.IContainerTreeProps {
    const route = state.container

    return {
        filter: route.filter,
    }
}

function mapDispatchToProps(
    dispatch: Dispatch<Action>,
    props: local.IContainerTreeUiProps,
): local.IContainerTreeActions {
    return {
        setFilter: filter => dispatch(ContainerActions.setFilter(filter)),
    }
}

export const ContainerTree = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CContainerTree)
