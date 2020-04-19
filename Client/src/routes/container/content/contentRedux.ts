import { IClientState } from 'movie-db-client'
import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import * as local from './content'

function mapStateToProps(state: IClientState, props: local.IContainerContentUiProps): local.IContainerContentProps {
    const mui = state.mui.container

    return {
        list: state.container.recordings,
        name: mui.name,
        position: mui.position,
    }
}

function mapDispatchToProps(
    dispatch: Dispatch<Action>,
    props: local.IContainerContentUiProps
): local.IContainerContentActions {
    return {}
}

export const ContainerContent = connect(mapStateToProps, mapDispatchToProps)(local.CContainerContent)
