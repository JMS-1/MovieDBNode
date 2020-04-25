import { computed } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import { Icon, Table } from 'semantic-ui-react'

import { IRecording } from '../../../../../Server/src/model'
import { Genre } from '../../../components/genre/genre'
import { Language } from '../../../components/language/language'
import { languages, genres, rootStore } from '../../../stores'
import { routes } from '../../../stores/routes'

export interface IRecordingItemUiProps {
    recording: IRecording
}

function makeNumber(n: number): string {
    return n < 10 ? `0${n}` : `${n}`
}

function makeTime(date: Date): string {
    return `${makeNumber(date.getDate())}.${makeNumber(1 + date.getMonth())}.${date.getFullYear()} ${makeNumber(
        date.getHours()
    )}:${makeNumber(date.getMinutes())}:${makeNumber(date.getSeconds())}`
}

@observer
export class RecordingItem extends React.PureComponent<IRecordingItemUiProps> {
    render(): JSX.Element {
        const { recording } = this.props

        return (
            <Table.Row className='movie-db-recording-item'>
                <Table.Cell selectable className='name' onClick={this.onSelect}>
                    <div>{recording.fullName}</div>
                    {recording.rentTo && <Icon name='user outline' title={recording.rentTo} />}
                </Table.Cell>
                <Table.Cell className='created'>{makeTime(new Date(recording.created))}</Table.Cell>
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

    private readonly onSelect = (): void => {
        rootStore.router.push(`${routes.recording}/${this.props.recording._id}`)
    }

    @computed
    private get languages(): string[] {
        const { recording } = this.props

        return [...(recording.languages || [])].sort((l, r) => {
            const left = languages.getItem(l)
            const right = languages.getItem(r)

            return ((left && left.name) || l).localeCompare((right && right.name) || r)
        })
    }

    @computed
    private get genres(): string[] {
        const { recording } = this.props

        return [...(recording.genres || [])].sort((l, r) => {
            const left = genres.getItem(l)
            const right = genres.getItem(r)

            return ((left && left.name) || l).localeCompare((right && right.name) || r)
        })
    }
}
