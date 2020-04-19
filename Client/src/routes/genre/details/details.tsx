import { observer } from 'mobx-react'
import * as React from 'react'
import { Form } from 'semantic-ui-react'

import { IGenre } from '../../../../../Server/src/model'
import { DeleteConfirm } from '../../../components/confirm/confirm'
import { DetailActions } from '../../../components/detailActions/actions'
import { TextInput } from '../../../components/textInput/textInput'
import { genres } from '../../../stores'

export interface IGenreDetailsUiProps {
    id: string
}

@observer
export class GenreDetails extends React.PureComponent<IGenreDetailsUiProps> {
    render(): JSX.Element {
        if (!genres.selected && this.props.id !== 'NEW') {
            return null
        }

        return (
            <div className='movie-db-genre-details'>
                <DeleteConfirm scope='genre' store={genres} />
                <DetailActions<IGenre> store={genres} />
                <Form error={genres.errors !== true}>
                    <TextInput<IGenre> required prop='name' scope='genre' store={genres} />
                </Form>
            </div>
        )
    }

    UNSAFE_componentWillMount(): void {
        genres.select(this.props.id)
    }

    UNSAFE_componentWillReceiveProps(props: Readonly<IGenreDetailsUiProps>): void {
        if (props.id !== this.props.id) {
            genres.select(props.id)
        }
    }
}
