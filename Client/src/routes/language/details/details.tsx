import * as React from 'react'

export interface ILanguageDetailsUiProps {
    id: string
}

export interface ILanguageDetailsProps {}

export interface ILanguageDetailsActions {
    loadDetails(id: string): void
}

export type TLanguageDetailsProps = ILanguageDetailsProps & ILanguageDetailsUiProps & ILanguageDetailsActions

export class CLanguageDetails extends React.PureComponent<TLanguageDetailsProps> {
    render(): JSX.Element {
        return <div className='movie-db-language-details'>[DETAILS]</div>
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
