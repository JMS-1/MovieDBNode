import { map, Observable } from 'rxjs'

export interface ISelectItem {
    key: string
    text: string
}

type TProps<TField extends string> = '_id' | TField

export function createSorted<T extends Record<TProps<TField>, string>, TField extends string>(
    obs: Observable<Record<string, T>>,
    prop: TField
): Observable<ISelectItem[]> {
    return obs.pipe(
        map((m) =>
            Object.keys(m)
                .map((id) => ({ key: id, text: m[id][prop] || id }))
                .sort((l, r) => l.text.toLocaleLowerCase().localeCompare(r.text.toLocaleLowerCase()))
        )
    )
}
