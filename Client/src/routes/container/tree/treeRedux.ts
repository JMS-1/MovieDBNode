import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './tree'

function mapStateToProps(state: IClientState, props: local.IContainerTreeUiProps): local.IContainerTreeProps {
    return {}
}

function mapDispatchToProps(
    dispatch: Dispatch<Action>,
    props: local.IContainerTreeUiProps,
): local.IContainerTreeActions {
    return {}
}

export const ContainerTree = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CContainerTree)
