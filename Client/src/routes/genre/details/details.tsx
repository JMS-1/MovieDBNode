import * as React from 'react'
import { Button, Form } from 'semantic-ui-react'

import { GenreTextInput } from '../../../components/textInput/textInputRedux'

export interface IGenreDetailsUiProps {
    id: string
}

export interface IGenreDetailsProps {
    cancelLabel: string
    hasChanges: boolean
    hasError: boolean
    lost: boolean
    saveLabel: string
}

export interface IGenreDetailsActions {
    cancel(): void
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
                <Button.Group>
                    <Button onClick={this.props.cancel} disabled={!hasChanges}>
                        {this.props.cancelLabel}
                    </Button>
                    <Button onClick={this.props.save} disabled={hasError || !hasChanges}>
                        {this.props.saveLabel}
                    </Button>
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
