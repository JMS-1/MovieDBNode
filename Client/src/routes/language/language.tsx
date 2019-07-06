import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { DropdownItemProps, Label, List } from 'semantic-ui-react'

import { routes } from 'movie-db-client'

import { LanguageDetails } from './details/detailsRedux'

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
            <div className='movie-db-language-route movie-db-route'>
                <div className='movie-db-language-list'>
                    <List selection>
                        {this.props.languageOptions.map(l => (
                            <List.Item key={l.key}>
                                <Label active={l.key === id} as='a' href={`#${routes.language}/${l.key}`}>
                                    {l.text}
                                </Label>
                            </List.Item>
                        ))}
                    </List>
                </div>
                <LanguageDetails id={id} />
            </div>
        )
    }
}
