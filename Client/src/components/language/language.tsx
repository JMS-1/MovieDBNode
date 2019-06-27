import * as React from 'react'

export interface ILanguageUiProps {
    id: string
}

export interface ILanguageProps {
    name: string
}

export interface ILanguageActions {}

export type TLanguageProps = ILanguageProps & ILanguageUiProps & ILanguageActions

export class CLanguage extends React.PureComponent<TLanguageProps> {
    render(): JSX.Element {
        return <>{this.props.name}</>
    }
}
