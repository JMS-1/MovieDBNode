import * as React from 'react'
import { Button, Form } from 'semantic-ui-react'

import { ConfirmDeleteGenre } from '../../../components/confirm/confirmRedux'
import { GenreTextInput } from '../../../components/textInput/textInputRedux'

export interface IGenreDetailsUiProps {
    id: string
}

export interface IGenreDetailsProps {
    cancelLabel: string
    deleteLabel: string
    hasChanges: boolean
    hasError: boolean
    lost: boolean
    saveLabel: string
    showDelete: boolean
}

export interface IGenreDetailsActions {
    cancel(): void
    confirmDelete(): void
    loadDetails(id: string): void
    save(): void
}

export type TGenreDetailsProps = IGenreDetailsProps & IGenreDetailsUiProps & IGenreDetailsActions

export class CGenreDetails extends React.PureComponent<TGenreDetailsProps> {
    render(): JSX.Element {
        if (this.props.lost) {
            return null
        }

        const { hasChanges, hasError } = this.props

        return (
            <div className='movie-db-genre-details'>
                <ConfirmDeleteGenre />
                <Button.Group>
                    <Button onClick={this.props.cancel} disabled={!hasChanges}>
                        {this.props.cancelLabel}
                    </Button>
                    <Button onClick={this.props.save} disabled={hasError || !hasChanges}>
                        {this.props.saveLabel}
                    </Button>
                    {this.props.showDelete && (
                        <Button onClick={this.props.confirmDelete}>{this.props.deleteLabel}</Button>
                    )}
                </Button.Group>
                <Form error={hasError}>
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
