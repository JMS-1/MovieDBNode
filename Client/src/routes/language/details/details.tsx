import * as React from 'react'
import { Button, Form, Input } from 'semantic-ui-react'

import { LanguageTextInput } from '../../../components/textInput/textInputRedux'

export interface ILanguageDetailsUiProps {
    id: string
}

export interface ILanguageDetailsProps {
    cancelLabel: string
    hasChanges: boolean
    hasError: boolean
    idLabel: string
    lost: boolean
    realId: string
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

        const { hasChanges, hasError, realId } = this.props

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
                    <Form.Field>
                        <label>{this.props.idLabel}</label>
                        <Input input='text' value={realId || ''} readOnly disabled />
                    </Form.Field>
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
