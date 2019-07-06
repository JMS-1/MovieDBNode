import * as React from 'react'
import { Form } from 'semantic-ui-react'

import { ConfirmDeleteLanguage } from '../../../components/confirm/confirmRedux'
import { LanguageDetailActions } from '../../../components/detailActions/actionsRedux'
import { LanguageTextInput } from '../../../components/textInput/textInputRedux'

export interface ILanguageDetailsUiProps {
    id: string
}

export interface ILanguageDetailsProps {
    hasError: boolean
    lost: boolean
}

export interface ILanguageDetailsActions {
    loadDetails(id: string): void
}

export type TLanguageDetailsProps = ILanguageDetailsProps & ILanguageDetailsUiProps & ILanguageDetailsActions

export class CLanguageDetails extends React.PureComponent<TLanguageDetailsProps> {
    render(): JSX.Element {
        if (this.props.lost) {
            return null
        }

        return (
            <div className='movie-db-language-details'>
                <ConfirmDeleteLanguage />
                <LanguageDetailActions />
                <Form error={this.props.hasError}>
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
