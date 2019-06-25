import * as React from 'react'
import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './level'

import { getContainerChildMap, getContainerMap } from '../../../controller'

const noChildren: string[] = []

export const ContainerNode = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CContainerNode)

function mapStateToProps(state: IClientState, props: local.IContainerNodeUiProps): local.IContainerNodeProps {
    const container = getContainerMap(state)[props.scope]
    const list = getContainerChildMap(state)[props.scope] || noChildren

    return {
        list: list.map(id => <ContainerNode key={id} scope={id} detail={props.detail} />),
        name: (container && container.name) || props.scope,
        type: container ? container.type : undefined,
    }
}

function mapDispatchToProps(
    dispatch: Dispatch<Action>,
    props: local.IContainerNodeUiProps,
): local.IContainerNodeActions {
    return {}
}
