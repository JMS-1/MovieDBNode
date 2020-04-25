import { observer } from 'mobx-react'
import * as React from 'react'
import { MenuItem } from 'semantic-ui-react'

import { recordings } from '../../../stores'

export interface IPageSizeSelectorUiProps {
    size: number
}

@observer
export class PageSizeSelector extends React.PureComponent<IPageSizeSelectorUiProps> {
    render(): JSX.Element {
        const { size } = this.props

        return (
            <MenuItem
                active={size === recordings.queryFilter.pageSize}
                className='movie-db-recording-size'
                onClick={this.onSelect}
            >
                {size}
            </MenuItem>
        )
    }

    private readonly onSelect = (): void => recordings.setFilterProp('pageSize', this.props.size)
}
