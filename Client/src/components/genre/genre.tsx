import { observer } from 'mobx-react'
import * as React from 'react'

import { genres } from '../../stores'

export interface IGenreUiProps {
    id: string
}

@observer
export class Genre extends React.PureComponent<IGenreUiProps> {
    render(): JSX.Element {
        const { id } = this.props

        return <>{genres.getItem(id)?.name || id}</>
    }
}
