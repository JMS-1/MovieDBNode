import { map, Observable } from 'rxjs'

export interface ISelectItem {
    key: string
    text: string
}

interface ISortable {
    _id: string
    name: string
}

export function createSorted<T extends ISortable>(obs: Observable<Record<string, T>>): Observable<ISelectItem[]> {
    return obs.pipe(
        map((m) =>
            Object.keys(m)
                .map((id) => ({ key: id, text: m[id].name || id }))
                .sort((l, r) => l.text.toLocaleLowerCase().localeCompare(r.text.toLocaleLowerCase()))
        )
    )
}
