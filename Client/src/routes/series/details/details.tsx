import * as React from 'react'

export interface ISeriesDetailsUiProps {
    id: string
}

export interface ISeriesDetailsProps {}

export interface ISeriesDetailsActions {
    loadDetails(id: string): void
}

export type TSeriesDetailsProps = ISeriesDetailsProps & ISeriesDetailsUiProps & ISeriesDetailsActions

export class CSeriesDetails extends React.PureComponent<TSeriesDetailsProps> {
    render(): JSX.Element {
        return <div className='movie-db-series-details'>[DETAILS]</div>
    }

    componentWillMount(): void {
        this.props.loadDetails(this.props.id)
    }

    componentWillReceiveProps(props: Readonly<TSeriesDetailsProps>, context: any): void {
        if (props.id !== this.props.id) {
            this.props.loadDetails(props.id)
        }
    }
}
