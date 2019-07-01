import * as React from 'react'
import { Button, Form } from 'semantic-ui-react'

import { LanguageTextInput } from '../../../components/textInput/textInputRedux'

export interface ILanguageDetailsUiProps {
    id: string
}

export interface ILanguageDetailsProps {
    cancelLabel: string
    hasChanges: boolean
    hasError: boolean
    lost: boolean
    saveLabel: string
}

export interface ILanguageDetailsActions {
    cancel(): void
    loadDetails(id: string): void
    save(): void
}

export type TLanguageDetailsProps = ILanguageDetailsProps & ILanguageDetailsUiProps & ILanguageDetailsActions

export class CLanguageDetails extends React.PureComponent<TLanguageDetailsProps> {
    render(): JSX.Element {
        if (this.props.lost) {
            return null
        }

        const { hasChanges, hasError } = this.props

        return (
            <div className='movie-db-language-details'>
                <Button.Group>
                    <Button onClick={this.props.cancel} disabled={!hasChanges}>
                        {this.props.cancelLabel}
                    </Button>
                    <Button onClick={this.props.save} disabled={hasError || !hasChanges}>
                        {this.props.saveLabel}
                    </Button>
                </Button.Group>
                <Form error={hasError}>
                    <LanguageTextInput prop='name' required />
                </Form>
            </div>
        )
    }

    componentWillMount(): void {
        this.props.loadDetails(this.props.id)
    }

    componentWillReceiveProps(props: Readonly<TLanguageDetailsProps>, context: any): void {
        if (props.id !== this.props.id) {
            this.props.loadDetails(props.id)
        }
    }
}
