import * as React from 'react'
import { Table } from 'semantic-ui-react'

import { Genre } from '../../../components/genre/genreRedux'
import { Language } from '../../../components/language/languageRedux'

export interface IRecordingItemUiProps {
    id: string
}

export interface IRecordingItemProps {
    created: string
    genres: string[]
    languages: string[]
    name: string
    rentTo: string
}

export interface IRecordingItemActions {}

export type TRecordingItemProps = IRecordingItemProps & IRecordingItemUiProps & IRecordingItemActions

export class CRecordingItem extends React.PureComponent<TRecordingItemProps> {
    render(): JSX.Element {
        return (
            <Table.Row className='movie-db-recording-item'>
                <Table.Cell>
                    {this.props.name}/{this.props.rentTo}
                </Table.Cell>
                <Table.Cell>{this.props.created}</Table.Cell>
                <Table.Cell>
                    {this.props.languages.map(l => (
                        <React.Fragment key={l}>
                            <Language id={l} />
                            <span className='separator'>, </span>
                        </React.Fragment>
                    ))}
                </Table.Cell>
                <Table.Cell>
                    {this.props.genres.map(l => (
                        <React.Fragment key={l}>
                            <Genre id={l} />
                            <span className='separator'>, </span>
                        </React.Fragment>
                    ))}
                </Table.Cell>
            </Table.Row>
        )
    }
}
