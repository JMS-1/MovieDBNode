import * as React from 'react'
import { Form } from 'semantic-ui-react'

import { ConfirmDeleteGenre } from '../../../components/confirm/confirmRedux'
import { GenreDetailActions } from '../../../components/detailActions/actionsRedux'
import { GenreTextInput } from '../../../components/textInput/textInputRedux'

export interface IGenreDetailsUiProps {
    id: string
}

export interface IGenreDetailsProps {
    hasError: boolean
    lost: boolean
}

export interface IGenreDetailsActions {
    loadDetails(id: string): void
}

export type TGenreDetailsProps = IGenreDetailsProps & IGenreDetailsUiProps & IGenreDetailsActions

export class CGenreDetails extends React.PureComponent<TGenreDetailsProps> {
    render(): JSX.Element {
        if (this.props.lost) {
            return null
        }

        return (
            <div className='movie-db-genre-details'>
                <ConfirmDeleteGenre />
                <GenreDetailActions />
                <Form error={this.props.hasError}>
                    <GenreTextInput prop='name' required />
                </Form>
            </div>
        )
    }

    componentWillMount(): void {
        this.props.loadDetails(this.props.id)
    }

    componentWillReceiveProps(props: Readonly<TGenreDetailsProps>, context: any): void {
        if (props.id !== this.props.id) {
            this.props.loadDetails(props.id)
        }
    }
}
