import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { DropdownItemProps, Label, List } from 'semantic-ui-react'

import { routes } from 'movie-db-client'

import { LanguageDetails } from './details/detailsRedux'

import { MasterDetailRoute } from '../../components/masterDetailRoute/masterDetailRedux'

interface ILanguageRouteParams {
    id?: string
}

export interface ILanguageRouteUiProps extends RouteComponentProps<ILanguageRouteParams> {}

export interface ILanguageRouteProps {
    languageOptions: DropdownItemProps[]
}

export interface ILanguageRouteActions {}

export type TLanguageRouteProps = ILanguageRouteProps & ILanguageRouteUiProps & ILanguageRouteActions

export class CLanguageRoute extends React.PureComponent<TLanguageRouteProps> {
    render(): JSX.Element {
        const { id } = this.props.match.params

        return (
            <MasterDetailRoute className='movie-db-language-route'>
                <List selection>
                    {this.props.languageOptions.map(l => (
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
