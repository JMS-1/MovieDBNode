import { observer } from 'mobx-react'
import * as React from 'react'
import { Icon, Table } from 'semantic-ui-react'

import { Genre } from '../../../components/genre/genreRedux'
import { Language } from '../../../components/language/languageRedux'
import { IGenreMap, ILanguageMap } from '../../../controller'

export interface IRecordingItemUiProps {
    id: string
}

export interface IRecordingItemProps {
    created: string
    genreMap: IGenreMap
    genres: string[]
    languageMap: ILanguageMap
    languages: string[]
    name: string
    rentTo: string
}

export interface IRecordingItemActions {
    select(): void
}

export type TRecordingItemProps = IRecordingItemProps & IRecordingItemUiProps & IRecordingItemActions

@observer
export class CRecordingItem extends React.PureComponent<TRecordingItemProps> {
    render(): JSX.Element {
        const { rentTo } = this.props

        return (
            <Table.Row className='movie-db-recording-item'>
                <Table.Cell selectable className='name' onClick={this.props.select}>
                    <div>{this.props.name}</div>
                    {rentTo && <Icon name='user outline' title={rentTo} />}
                </Table.Cell>
                <Table.Cell className='created'>{this.props.created}</Table.Cell>
                <Table.Cell className='languages'>
                    {this.languages.map((l) => (
                        <React.Fragment key={l}>
                            <Language id={l} />
                            <span className='separator'>, </span>
                        </React.Fragment>
                    ))}
                </Table.Cell>
                <Table.Cell className='genres'>
                    {this.genres.map((l) => (
                        <React.Fragment key={l}>
                            <Genre id={l} />
                            <span className='separator'>, </span>
                        </React.Fragment>
                    ))}
                </Table.Cell>
            </Table.Row>
        )
    }

    private get languages(): string[] {
        const { languageMap } = this.props

        return [...(this.props.languages || [])].sort((l, r) => {
            const left = languageMap[l]
            const right = languageMap[r]

            return ((left && left.name) || l).localeCompare((right && right.name) || r)
        })
    }

    private get genres(): string[] {
        const { genreMap } = this.props

        return [...(this.props.genres || [])].sort((l, r) => {
            const left = genreMap[l]
            const right = genreMap[r]

            return ((left && left.name) || l).localeCompare((right && right.name) || r)
        })
    }
}
