import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { DropdownItemProps, List } from 'semantic-ui-react'

import { routes } from 'movie-db-client'

interface IGenreRouteParams {
    id?: string
}

export interface IGenreRouteUiProps extends RouteComponentProps<IGenreRouteParams> {}

export interface IGenreRouteProps {
    genreOptions: DropdownItemProps[]
    selected: string
}

export interface IGenreRouteActions {}

export type TGenreRouteProps = IGenreRouteProps & IGenreRouteUiProps & IGenreRouteActions

export class CGenreRoute extends React.PureComponent<TGenreRouteProps> {
    render(): JSX.Element {
        const { selected } = this.props

        return (
            <div className='movie-db-genre-route movie-db-route'>
                <div className='movie-db-genre-list'>
                    <List selection>
                        {this.props.genreOptions.map(l => (
                            <List.Item
                                active={l.key === selected}
                                as='a'
                                href={`#${routes.genre}/${l.key}`}
                                key={l.key}
                            >
                                {l.text}
                            </List.Item>
                        ))}
                    </List>
                </div>
                <div className='movie-db-genre-details'>[DETAILS]</div>
            </div>
        )
    }
}
