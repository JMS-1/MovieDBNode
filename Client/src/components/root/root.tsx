import * as React from 'react'
import { Route } from 'react-router'
import { Dimmer, Loader } from 'semantic-ui-react'

import { ContainerRoute } from '../../routes/container/containerRedux'

export interface IRootUiProps {}

export interface IRootProps {
    busy: boolean
}

export interface IRootActions {}

export type TRootProps = IRootProps & IRootUiProps & IRootActions

export class CRoot extends React.PureComponent<TRootProps> {
    render(): JSX.Element {
        return (
            <div className='movie-db-root'>
                <Dimmer page active={this.props.busy}>
                    <Loader />
                </Dimmer>
                <div className='content'>
                    <Route path='/container/:id?' component={ContainerRoute} />
                </div>
            </div>
        )
    }
}
