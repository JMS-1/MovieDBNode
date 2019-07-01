import * as React from 'react'

export interface ISeriesDetailsUiProps {
    id: string
}

export interface ISeriesDetailsProps {}

export interface ISeriesDetailsActions {}

export type TSeriesDetailsProps = ISeriesDetailsProps & ISeriesDetailsUiProps & ISeriesDetailsActions

export class CSeriesDetails extends React.PureComponent<TSeriesDetailsProps> {
    render(): JSX.Element {
        return <div className='movie-db-series-details'>[DETAILS]</div>
    }
}
