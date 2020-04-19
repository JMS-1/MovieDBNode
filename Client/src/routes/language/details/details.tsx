import { observer } from 'mobx-react'
import * as React from 'react'
import { Form } from 'semantic-ui-react'

import { ILanguage } from '../../../../../Server/src/model'
import { DeleteConfirm } from '../../../components/confirm/confirm'
import { DetailActions } from '../../../components/detailActions/actions'
import { TextInput } from '../../../components/textInput/textInput'
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
                    <DeleteConfirm scope='language' store={languages} />
                    <DetailActions<ILanguage> store={languages} />
                    <Form error={languages.errors !== true}>
                        <TextInput<ILanguage> required prop='name' scope='language' store={languages} />
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
