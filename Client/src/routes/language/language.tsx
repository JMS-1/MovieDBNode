import { observer } from 'mobx-react'
import { routes } from 'movie-db-client'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Label, List } from 'semantic-ui-react'

import { LanguageDetails } from './details/details'

import { MasterDetailRoute } from '../../components/masterDetailRoute/masterDetailRedux'
import { languages } from '../../stores'

interface ILanguageRouteParams {
    id?: string
}

export interface ILanguageRouteUiProps extends RouteComponentProps<ILanguageRouteParams> {}

@observer
export class LanguageRoute extends React.PureComponent<ILanguageRouteUiProps> {
    render(): JSX.Element {
        const { id } = this.props.match.params

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
