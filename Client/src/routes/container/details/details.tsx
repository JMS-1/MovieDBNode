import * as React from 'react'

export interface IContainerDetailsUiProps {
    id: string
}

export interface IContainerDetailsProps {
    lost: boolean
}

export interface IContainerDetailsActions {}

export type TContainerDetailsProps = IContainerDetailsProps & IContainerDetailsUiProps & IContainerDetailsActions

export class CContainerDetails extends React.PureComponent<TContainerDetailsProps> {
    render(): JSX.Element {
        if (this.props.lost) {
            return null
        }

        return <div className='movie-db-container-details'>[DETAILS]</div>
    }
}
