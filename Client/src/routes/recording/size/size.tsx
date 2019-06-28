import * as React from 'react'
import { MenuItem } from 'semantic-ui-react'

export interface IPageSizeSelectorUiProps {
    size: number
}

export interface IPageSizeSelectorProps {
    currentSize: number
}

export interface IPageSizeSelectorActions {
    select(): void
}

export type TPageSizeSelectorProps = IPageSizeSelectorProps & IPageSizeSelectorUiProps & IPageSizeSelectorActions

export class CPageSizeSelector extends React.PureComponent<TPageSizeSelectorProps> {
    render(): JSX.Element {
        const { size } = this.props

        return (
            <MenuItem
                active={size === this.props.currentSize}
                className='movie-db-recording-size'
                onClick={this.props.select}
            >
                {size}
            </MenuItem>
        )
    }
}
