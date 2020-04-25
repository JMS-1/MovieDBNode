import { observer } from 'mobx-react'
import * as React from 'react'

import { languages } from '../../stores'

export interface ILanguageUiProps {
    id: string
}

@observer
export class Language extends React.PureComponent<ILanguageUiProps> {
    render(): JSX.Element {
        const { id } = this.props

        return <>{languages.getItem(id)?.name || id}</>
    }
}
