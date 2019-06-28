import * as React from 'react'
import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './level'

import { getContainerMap, getFilteredContainerChildMap } from '../../../controller'

const noChildren: string[] = []

export const ContainerNode = connect(
    mapStateToProps,
    mapDispatchToProps
)(local.CContainerNode)

function mapStateToProps(state: IClientState, props: local.IContainerNodeUiProps): local.IContainerNodeProps {
    const container = getContainerMap(state)[props.scope]
    const list = getFilteredContainerChildMap(state)[props.scope] || noChildren
    const type = state.mui.container.types[container && container.raw.type]

    return {
        list: list.map(id => <ContainerNode key={id} scope={id} detail={props.detail} />),
        name: (container && container.raw.name) || props.scope,
        type: (type && type.icon) || 'help',
    }
}

function mapDispatchToProps(
    dispatch: Dispatch<Action>,
    props: local.IContainerNodeUiProps
): local.IContainerNodeActions {
    return {}
}
