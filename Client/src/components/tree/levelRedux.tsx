import * as React from 'react'
import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState, routes } from 'movie-db-client'

import * as local from './level'

import * as controller from '../../controller'

const noChildren: string[] = []

export const ContainerNode = connect(
    mapContainerProps,
    mapContainerActions,
)(local.CNode)

function mapContainerProps(state: IClientState, props: local.INodeUiProps): local.INodeProps {
    const container = controller.getContainerMap(state)[props.scope]
    const list = controller.getFilteredContainerChildMap(state)[props.scope] || noChildren
    const type = state.mui.container.types[container && container.raw.type]

    return {
        list: list.map(id => <ContainerNode key={id} scope={id} detail={props.detail} />),
        name: (container && container.raw.name) || props.scope,
        route: routes.container,
        type: (type && type.icon) || 'help',
    }
}

function mapContainerActions(dispatch: Dispatch<Action>, props: local.INodeUiProps): local.INodeActions {
    return {}
}

export const SeriesNode = connect(
    mapSeriesProps,
    mapSeriesActions,
)(local.CNode)

function mapSeriesProps(state: IClientState, props: local.INodeUiProps): local.INodeProps {
    const series = controller.getSeriesMap(state)[props.scope]
    const list = controller.getFilteredSeriesChildMap(state)[props.scope] || noChildren

    return {
        list: list.map(id => <SeriesNode key={id} scope={id} detail={props.detail} />),
        name: (series && series.raw.name) || props.scope,
        route: routes.series,
        type: undefined,
    }
}

function mapSeriesActions(dispatch: Dispatch<Action>, props: local.INodeUiProps): local.INodeActions {
    return {}
}
