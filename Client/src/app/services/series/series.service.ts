import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Apollo } from 'apollo-angular'
import { BehaviorSubject, Observable } from 'rxjs'

import { ISeries } from '../../../api'
import { EditableService } from '../edit.service'
import { ErrorService } from '../error/error.service'
import { ValidationService } from '../validation/validation.service'

export interface ISeriesNode extends ISeries {
    allChildren: string[]
    children: ISeriesNode[]
    level: number
    parent?: ISeriesNode
}

function setLevel(series: ISeriesNode, level = 0, all: string[] = []): void {
    all.push(series._id)

    series.level = level++

    series.children.forEach((c) => setLevel(c, level, series.allChildren))

    all.push(...series.children.map((c) => c._id))
}

@Injectable()
export class SeriesService extends EditableService<ISeriesNode> {
    protected override readonly ignoredFields: string[] = [
        '__typename',
        '_id',
        'allChildren',
        'children',
        'level',
        'parent',
    ]

    private readonly _roots = new BehaviorSubject<ISeriesNode[]>([])

    get roots(): Observable<ISeriesNode[]> {
        return this._roots
    }

    constructor(gql: Apollo, validation: ValidationService, router: Router, errors: ErrorService) {
        super(gql, 'Series', 'series', '_id name description parentId fullName', validation, router, errors)

        this.load()
    }

    protected override createMap(series: ISeriesNode[]): Record<string, ISeriesNode> {
        const map = super.createMap(series)

        const roots: ISeriesNode[] = []

        series.forEach((series) => {
            series.name = series.name || series._id
            series.fullName = series.fullName || series.name

            series.allChildren = []
            series.children = []
            series.parent = series.parentId ? map[series.parentId] : undefined
        })

        series.forEach((series) => {
            if (series.parent) {
                series.parent.children.push(series)
            } else {
                roots.push(series)
            }
        })

        roots.forEach((s) => setLevel(s))

        this._roots.next(roots)

        return map
    }

    override ngOnDestroy(): void {
        super.ngOnDestroy()

        this._roots.complete()
    }
}
