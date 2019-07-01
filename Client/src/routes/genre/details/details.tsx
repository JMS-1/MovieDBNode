import * as React from 'react'

export interface IGenreDetailsUiProps {
    id: string
}

export interface IGenreDetailsProps {}

export interface IGenreDetailsActions {
    loadDetails(id: string): void
}

export type TGenreDetailsProps = IGenreDetailsProps & IGenreDetailsUiProps & IGenreDetailsActions

export class CGenreDetails extends React.PureComponent<TGenreDetailsProps> {
    render(): JSX.Element {
        return <div className='movie-db-genre-details'>[DETAILS]</div>
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
