import { observer } from 'mobx-react'
import { routes } from 'movie-db-client'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Label, List } from 'semantic-ui-react'

import { GenreDetails } from './details/details'

import { MasterDetailRoute } from '../../components/masterDetailRoute/masterDetailRedux'
import { genres } from '../../stores'

interface IGenreRouteParams {
    id?: string
}

export interface IGenreRouteUiProps extends RouteComponentProps<IGenreRouteParams> {}

@observer
export class GenreRoute extends React.PureComponent<IGenreRouteUiProps> {
    render(): JSX.Element {
        const { id } = this.props.match.params

        return (
            <MasterDetailRoute className='movie-db-genre-route'>
                <List selection>
                    {genres.asOptions.map((l) => (
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
