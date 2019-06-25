import * as React from 'react'
import { Route } from 'react-router'

import { ContainerRoute } from '../../routes/container/containerRedux'

export interface IRootUiProps {}

export interface IRootProps {}

export interface IRootActions {}

export type TRootProps = IRootProps & IRootUiProps & IRootActions

export class CRoot extends React.PureComponent<TRootProps> {
    render(): JSX.Element {
        return (
            <div className='movie-db-root'>
                <div className='content'>
                    <Route path='/container/:id?' component={ContainerRoute} />
                </div>
            </div>
        )
    }
}
