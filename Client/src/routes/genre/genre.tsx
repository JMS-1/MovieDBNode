import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { DropdownItemProps, Label, List } from 'semantic-ui-react'

import { routes } from 'movie-db-client'

import { GenreDetails } from './details/detailsRedux'

import { MasterDetailRoute } from '../../components/masterDetailRoute/masterDetailRedux'

interface IGenreRouteParams {
    id?: string
}

export interface IGenreRouteUiProps extends RouteComponentProps<IGenreRouteParams> {}

export interface IGenreRouteProps {
    genreOptions: DropdownItemProps[]
}

export interface IGenreRouteActions {}

export type TGenreRouteProps = IGenreRouteProps & IGenreRouteUiProps & IGenreRouteActions

export class CGenreRoute extends React.PureComponent<TGenreRouteProps> {
    render(): JSX.Element {
        const { id } = this.props.match.params

        return (
            <MasterDetailRoute className='movie-db-genre-route'>
                <List selection>
                    {this.props.genreOptions.map(l => (
                        <List.Item key={l.key}>
                            <Label active={l.key === id} as='a' href={`#${routes.genre}/${l.key}`}>
                                {l.text}
                            </Label>
                        </List.Item>
                    ))}
                </List>
                <GenreDetails id={id} />
            </MasterDetailRoute>
        )
    }
}
