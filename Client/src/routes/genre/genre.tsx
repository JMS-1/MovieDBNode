import { observer } from 'mobx-react'
import * as React from 'react'
import { Label, List } from 'semantic-ui-react'

import { GenreDetails } from './details/details'

import { MasterDetailRoute } from '../../components/masterDetailRoute/masterDetail'
import { genres } from '../../stores'
import { routes } from '../../stores/routes'

export interface IGenreRouteUiProps {
    match?: { params: { id?: string } }
}

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
