import { observer } from 'mobx-react'
import * as React from 'react'
import { useParams } from 'react-router'
import { Label, List } from 'semantic-ui-react'

import { LanguageDetails } from './details/details'

import { MasterDetailRoute } from '../../components/masterDetailRoute/masterDetail'
import { languages } from '../../stores'
import { routes } from '../../stores/routes'

export const LanguageRoute: React.FC = observer((_props) => {
    const { id } = useParams()

    return (
        <MasterDetailRoute className='movie-db-language-route'>
            <List selection>
                {languages.asOptions.map((l) => (
                    <List.Item key={l.key}>
                        <Label active={l.key === id} as='a' href={`#${routes.language}/${l.key}`}>
                            {l.text}
                        </Label>
                    </List.Item>
                ))}
            </List>
            <LanguageDetails id={id} />
        </MasterDetailRoute>
    )
})
