// eslint-disable-next-line unused-imports/no-unused-imports-ts
import { observer } from 'mobx-react'
import * as React from 'react'
import { Label, List } from 'semantic-ui-react'

import { LanguageDetails } from './details/details'

import { MasterDetailRoute } from '../../components/masterDetailRoute/masterDetail'
import { languages } from '../../stores'
import { routes } from '../../stores/routes'

export interface ILanguageRouteUiProps {
    match?: { params: { id?: string } }
}

@observer
export class LanguageRoute extends React.PureComponent<ILanguageRouteUiProps> {
    render(): JSX.Element {
        const id = this.props.match?.params.id

        return (
            <MasterDetailRoute className='movie-db-language-route'>
                <List selection>
                    {languages.asOptions.map((l) => (
                        <List.Item key={l.key}>
                            <Label active={l.key === id} as='a' href={`#${routes.language}/${l.key}`}>
                                {l.text}
                            </Label>
                        </List.Item>
                    ))}
                </List>
                <LanguageDetails id={id} />
            </MasterDetailRoute>
        )
    }
}
