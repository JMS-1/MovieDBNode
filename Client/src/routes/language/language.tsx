import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { DropdownItemProps, List } from 'semantic-ui-react'

import { routes } from 'movie-db-client'

interface ILanguageRouteParams {
    id?: string
}

export interface ILanguageRouteUiProps extends RouteComponentProps<ILanguageRouteParams> {}

export interface ILanguageRouteProps {
    languageOptions: DropdownItemProps[]
    selected: string
}

export interface ILanguageRouteActions {}

export type TLanguageRouteProps = ILanguageRouteProps & ILanguageRouteUiProps & ILanguageRouteActions

export class CLanguageRoute extends React.PureComponent<TLanguageRouteProps> {
    render(): JSX.Element {
        const { selected } = this.props

        return (
            <div className='movie-db-language-route movie-db-route'>
                <div className='movie-db-language-list'>
                    <List selection>
                        {this.props.languageOptions.map(l => (
                            <List.Item
                                active={l.key === selected}
                                as='a'
                                href={`#${routes.language}/${l.key}`}
                                key={l.key}
                            >
                                {l.text}
                            </List.Item>
                        ))}
                    </List>
                </div>
                <div className='movie-db-language-details'>[DETAILS]</div>
            </div>
        )
    }
}
