import * as React from 'react'
import { Button, Form } from 'semantic-ui-react'

import { ConfirmDeleteLanguage } from '../../../components/confirm/confirmRedux'
import { LanguageTextInput } from '../../../components/textInput/textInputRedux'

export interface ILanguageDetailsUiProps {
    id: string
}

export interface ILanguageDetailsProps {
    cancelLabel: string
    showDelete: boolean
    deleteLabel: string
    hasChanges: boolean
    hasError: boolean
    lost: boolean
    saveLabel: string
}

export interface ILanguageDetailsActions {
    cancel(): void
    confirmDelete(): void
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
                <ConfirmDeleteLanguage />
                <div>
                    <Button onClick={this.props.cancel} disabled={!hasChanges}>
                        {this.props.cancelLabel}
                    </Button>
                    <Button onClick={this.props.save} disabled={hasError || !hasChanges}>
                        {this.props.saveLabel}
                    </Button>
                    {this.props.showDelete && (
                        <Button onClick={this.props.confirmDelete}>{this.props.deleteLabel}</Button>
                    )}
                </div>
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
