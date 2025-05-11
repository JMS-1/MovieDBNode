import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { RecordingsService } from 'src/app/services/recordings/recordings.service'

import { IRecordingQueryResult } from '../../../api'

interface IPageItem {
    page: number | undefined
}

function createPages(maxPage: number, curPage: number): IPageItem[] {
    const pages: IPageItem[] = []

    if (maxPage < 1) {
        return pages
    }

    pages.push({ page: 1 })

    if (maxPage < 8) {
        for (let page = 2; page <= maxPage; page++) {
            pages.push({ page })
        }

        return pages
    }

    if (curPage <= 5) {
        for (let page = 2; page <= 5; page++) {
            pages.push({ page })
        }

        pages.push({ page: undefined })

        pages.push({ page: maxPage })

        return pages
    }

    pages.push({ page: undefined })

    if (curPage >= maxPage - 4) {
        for (let page = maxPage - 4; page <= maxPage; page++) {
            pages.push({ page })
        }

        return pages
    }

    for (let page = curPage - 1; page <= curPage + 1; page++) {
        pages.push({ page })
    }

    pages.push({ page: undefined })

    pages.push({ page: maxPage })

    return pages
}

@Component({
    selector: 'app-pagination',
    styleUrls: ['./pagination.component.scss'],
    templateUrl: './pagination.component.html',
    standalone: false
})
export class PaginationFilterComponent implements OnInit, OnDestroy {
    constructor(private readonly _recordingService: RecordingsService) {}

    private _recordings?: Subscription

    private _result: IRecordingQueryResult = {
        correlationId: '',
        count: 0,
        genres: [],
        languages: [],
        total: 0,
        view: [],
    }

    maxPage = 0

    pages: IPageItem[] = []

    get curPage(): number {
        return this._recordingService.page + 1
    }

    setPage(page: number): void {
        if (page < 1 || page > this.maxPage) {
            return
        }

        this._recordingService.page = page - 1
    }

    ngOnInit(): void {
        this._recordings = this._recordingService.result.subscribe((result) => {
            this.maxPage = result.count > 0 ? Math.ceil(result.count / this._recordingService.pageSize) : 0
            this.pages = createPages(this.maxPage, this.curPage)

            this._result = result
        })
    }

    ngOnDestroy(): void {
        this._recordings?.unsubscribe()
    }
}
