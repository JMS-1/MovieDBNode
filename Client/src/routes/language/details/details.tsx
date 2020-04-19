import { observer } from 'mobx-react'
import * as React from 'react'
import { Form } from 'semantic-ui-react'

import { ConfirmDeleteLanguage } from '../../../components/confirm/confirmRedux'
import { LanguageDetailActions } from '../../../components/detailActions/actionsRedux'
import { LanguageTextInput } from '../../../components/textInput/textInputRedux'
import { languages } from '../../../stores'

export interface ILanguageDetailsUiProps {
    id: string
}

@observer
export class LanguageDetails extends React.PureComponent<ILanguageDetailsUiProps> {
    render(): JSX.Element | null {
        const language = languages.selected

        if (!language) {
            return null
        }

        return (
            <div className='movie-db-language-details'>
                <>
                    {!language && <ConfirmDeleteLanguage />}
                    {!language && <LanguageDetailActions />}
                    <Form error={languages.updateErrors !== true}>
                        <LanguageTextInput required prop='name' />
                    </Form>
                </>
            </div>
        )
    }

    UNSAFE_componentWillMount(): void {
        languages.select(this.props.id)
    }

    UNSAFE_componentWillReceiveProps(props: Readonly<ILanguageDetailsUiProps>): void {
        if (props.id !== this.props.id) {
            languages.select(props.id)
        }
    }
}
