import { IClientState } from 'movie-db-client'
import * as React from 'react'
import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import * as local from './level'

import * as controller from '../../controller'
import { routes } from '../../stores/routes'

const noChildren: string[] = []

function mapContainerProps(state: IClientState, props: local.ILegacyNodeUiProps): local.ILegacyNodeProps {
    const container = controller.getContainerMap(state)[props.scope]
    const list = controller.getFilteredContainerChildMap(state)[props.scope] || noChildren
    const type = state.mui.container.types[container && container.raw.type]

    return {
        list: list.map((id) => <ContainerNode2 key={id} detail={props.detail} scope={id} />),
        name: (container && container.raw.name) || props.scope,
        route: routes.container,
        type: (type && type.icon) || 'help',
    }
}

function mapContainerActions(dispatch: Dispatch<Action>, props: local.ILegacyNodeUiProps): local.ILegacyNodeActions {
    return {}
}

export const ContainerNode2 = connect(mapContainerProps, mapContainerActions)(local.CLegacyNode)

function mapSeriesProps(state: IClientState, props: local.ILegacyNodeUiProps): local.ILegacyNodeProps {
    const series = controller.getSeriesMap(state)[props.scope]
    const list = controller.getFilteredSeriesChildMap(state)[props.scope] || noChildren

    return {
        list: list.map((id) => <SeriesNode key={id} detail={props.detail} scope={id} />),
        name: (series && series.raw.name) || props.scope,
        route: routes.series,
        type: undefined,
    }
}

function mapSeriesActions(dispatch: Dispatch<Action>, props: local.ILegacyNodeUiProps): local.ILegacyNodeActions {
    return {}
}
export const SeriesNode = connect(mapSeriesProps, mapSeriesActions)(local.CLegacyNode)
