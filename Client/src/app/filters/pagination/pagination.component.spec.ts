/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { ComponentFixture, TestBed } from '@angular/core/testing'
import { IRecordingQueryResult } from 'api'
import { BehaviorSubject } from 'rxjs'
import { RecordingService } from 'src/app/services/recordings/recording.service'

import { PaginationFilterComponent } from './pagination.component'

interface IRecordinService extends Partial<RecordingService> {
    result: BehaviorSubject<IRecordingQueryResult>
}

const initialResult: IRecordingQueryResult = {
    correlationId: '',
    count: 0,
    genres: [],
    languages: [],
    total: 0,
    view: [],
}

describe('Pagination Component', () => {
    let component: PaginationFilterComponent
    let fixture: ComponentFixture<PaginationFilterComponent>
    let recordings: IRecordinService

    beforeEach(async () => {
        recordings = {
            page: 0,
            pageSize: 1,
            result: new BehaviorSubject<IRecordingQueryResult>(initialResult),
        }

        await TestBed.configureTestingModule({
            declarations: [PaginationFilterComponent],
            providers: [{ provide: RecordingService, useValue: recordings }],
        }).compileComponents()

        fixture = TestBed.createComponent(PaginationFilterComponent)

        component = fixture.componentInstance

        fixture.detectChanges()
    })

    const mockCall = (params: Partial<RecordingService>, result: Partial<IRecordingQueryResult>): void => {
        Object.assign(recordings, params)

        recordings.result.next({ ...initialResult, ...result })

        fixture.detectChanges()
    }

    it('should create', () => {
        expect(component).toBeTruthy()
        expect(component.curPage).toBe(1)
        expect(component.maxPage).toBe(0)
        expect(component.pages).toEqual([])
    })

    it('should receive query response', () => {
        mockCall({ pageSize: 13 }, { count: 300 })

        expect(component).toBeTruthy()
        expect(component.curPage).toBe(1)
        expect(component.maxPage).toBe(24)
        expect(component.pages.length).toBe(7)
    })

    it('no data should be empty', () => {
        mockCall({ pageSize: 1 }, { count: 0 })

        const self = fixture.nativeElement as HTMLElement
        const selection = self.firstElementChild!.childNodes

        expect(selection.length).toBe(5)

        expect(selection[0].nodeName).toBe('A')
        expect(selection[0].textContent).toBe('«')
        expect(selection[1].nodeName).toBe('A')
        expect(selection[1].textContent).toBe('⟨')
        expect(selection[2].nodeName).toBe('#comment')
        expect(selection[3].nodeName).toBe('A')
        expect(selection[3].textContent).toBe('⟩')
        expect(selection[4].nodeName).toBe('A')
        expect(selection[4].textContent).toBe('»')
    })

    it('one with selection at 1', () => {
        mockCall({ pageSize: 1 }, { count: 1 })

        const self = fixture.nativeElement as HTMLElement
        const selection = self.firstElementChild!.childNodes

        expect(selection.length).toBe(6)

        expect(selection[2].nodeName).toBe('A')
        expect(selection[2].textContent).toBe('1')
        expect(selection[3].nodeName).toBe('#comment')
    })

    it('two pages with selection at 1', () => {
        mockCall({ pageSize: 1 }, { count: 2 })

        const self = fixture.nativeElement as HTMLElement
        const selection = self.firstElementChild!.childNodes

        expect(selection.length).toBe(7)

        expect(selection[2].nodeName).toBe('A')
        expect(selection[2].textContent).toBe('1')
        expect(selection[3].nodeName).toBe('A')
        expect(selection[3].textContent).toBe('2')
        expect(selection[4].nodeName).toBe('#comment')
    })

    it('two pages with selection at 2', () => {
        mockCall({ page: 1, pageSize: 1 }, { count: 2 })

        const self = fixture.nativeElement as HTMLElement
        const selection = self.firstElementChild!.childNodes

        expect(selection.length).toBe(7)

        expect(selection[2].nodeName).toBe('A')
        expect(selection[2].textContent).toBe('1')
        expect(selection[3].nodeName).toBe('A')
        expect(selection[3].textContent).toBe('2')
        expect(selection[4].nodeName).toBe('#comment')
    })

    it('three pages with selection at 1', () => {
        mockCall({ pageSize: 1 }, { count: 3 })

        const self = fixture.nativeElement as HTMLElement
        const selection = self.firstElementChild!.childNodes

        expect(selection.length).toBe(8)

        expect(selection[2].nodeName).toBe('A')
        expect(selection[2].textContent).toBe('1')
        expect(selection[3].nodeName).toBe('A')
        expect(selection[3].textContent).toBe('2')
        expect(selection[4].nodeName).toBe('A')
        expect(selection[4].textContent).toBe('3')
        expect(selection[5].nodeName).toBe('#comment')
    })

    it('four pages with selection at 1', () => {
        mockCall({ pageSize: 1 }, { count: 4 })

        const self = fixture.nativeElement as HTMLElement
        const selection = self.firstElementChild!.childNodes

        expect(selection.length).toBe(9)

        expect(selection[2].nodeName).toBe('A')
        expect(selection[2].textContent).toBe('1')
        expect(selection[3].nodeName).toBe('A')
        expect(selection[3].textContent).toBe('2')
        expect(selection[4].nodeName).toBe('A')
        expect(selection[4].textContent).toBe('3')
        expect(selection[5].nodeName).toBe('A')
        expect(selection[5].textContent).toBe('4')
        expect(selection[6].nodeName).toBe('#comment')
    })

    it('five pages with selection at 1', () => {
        mockCall({ pageSize: 1 }, { count: 5 })

        const self = fixture.nativeElement as HTMLElement
        const selection = self.firstElementChild!.childNodes

        expect(selection.length).toBe(10)

        expect(selection[2].nodeName).toBe('A')
        expect(selection[2].textContent).toBe('1')
        expect(selection[3].nodeName).toBe('A')
        expect(selection[3].textContent).toBe('2')
        expect(selection[4].nodeName).toBe('A')
        expect(selection[4].textContent).toBe('3')
        expect(selection[5].nodeName).toBe('A')
        expect(selection[5].textContent).toBe('4')
        expect(selection[6].nodeName).toBe('A')
        expect(selection[6].textContent).toBe('5')
        expect(selection[7].nodeName).toBe('#comment')
    })

    it('six pages with selection at 1', () => {
        mockCall({ pageSize: 1 }, { count: 6 })

        const self = fixture.nativeElement as HTMLElement
        const selection = self.firstElementChild!.childNodes

        expect(selection.length).toBe(11)

        expect(selection[2].nodeName).toBe('A')
        expect(selection[2].textContent).toBe('1')
        expect(selection[3].nodeName).toBe('A')
        expect(selection[3].textContent).toBe('2')
        expect(selection[4].nodeName).toBe('A')
        expect(selection[4].textContent).toBe('3')
        expect(selection[5].nodeName).toBe('A')
        expect(selection[5].textContent).toBe('4')
        expect(selection[6].nodeName).toBe('A')
        expect(selection[6].textContent).toBe('5')
        expect(selection[7].nodeName).toBe('A')
        expect(selection[7].textContent).toBe('6')
        expect(selection[8].nodeName).toBe('#comment')
    })

    it('seven pages with selection at 1', () => {
        mockCall({ pageSize: 1 }, { count: 7 })

        const self = fixture.nativeElement as HTMLElement
        const selection = self.firstElementChild!.childNodes

        expect(selection.length).toBe(12)

        expect(selection[2].nodeName).toBe('A')
        expect(selection[2].textContent).toBe('1')
        expect(selection[3].nodeName).toBe('A')
        expect(selection[3].textContent).toBe('2')
        expect(selection[4].nodeName).toBe('A')
        expect(selection[4].textContent).toBe('3')
        expect(selection[5].nodeName).toBe('A')
        expect(selection[5].textContent).toBe('4')
        expect(selection[6].nodeName).toBe('A')
        expect(selection[6].textContent).toBe('5')
        expect(selection[7].nodeName).toBe('A')
        expect(selection[7].textContent).toBe('6')
        expect(selection[8].nodeName).toBe('A')
        expect(selection[8].textContent).toBe('7')
        expect(selection[9].nodeName).toBe('#comment')
    })

    it('eight pages with selection at 1', () => {
        mockCall({ pageSize: 1 }, { count: 8 })

        const self = fixture.nativeElement as HTMLElement
        const selection = self.firstElementChild!.childNodes

        expect(selection.length).toBe(12)

        expect(selection[2].nodeName).toBe('A')
        expect(selection[2].textContent).toBe('1')
        expect(selection[3].nodeName).toBe('A')
        expect(selection[3].textContent).toBe('2')
        expect(selection[4].nodeName).toBe('A')
        expect(selection[4].textContent).toBe('3')
        expect(selection[5].nodeName).toBe('A')
        expect(selection[5].textContent).toBe('4')
        expect(selection[6].nodeName).toBe('A')
        expect(selection[6].textContent).toBe('5')
        expect(selection[7].nodeName).toBe('A')
        expect(selection[7].textContent).toBe('...')
        expect(selection[8].nodeName).toBe('A')
        expect(selection[8].textContent).toBe('8')
        expect(selection[9].nodeName).toBe('#comment')
    })

    it('eight pages with selection at 2', () => {
        mockCall({ page: 1, pageSize: 1 }, { count: 8 })

        const self = fixture.nativeElement as HTMLElement
        const selection = self.firstElementChild!.childNodes

        expect(selection.length).toBe(12)

        expect(selection[2].nodeName).toBe('A')
        expect(selection[2].textContent).toBe('1')
        expect(selection[3].nodeName).toBe('A')
        expect(selection[3].textContent).toBe('2')
        expect(selection[4].nodeName).toBe('A')
        expect(selection[4].textContent).toBe('3')
        expect(selection[5].nodeName).toBe('A')
        expect(selection[5].textContent).toBe('4')
        expect(selection[6].nodeName).toBe('A')
        expect(selection[6].textContent).toBe('5')
        expect(selection[7].nodeName).toBe('A')
        expect(selection[7].textContent).toBe('...')
        expect(selection[8].nodeName).toBe('A')
        expect(selection[8].textContent).toBe('8')
        expect(selection[9].nodeName).toBe('#comment')
    })

    it('eight pages with selection at 3', () => {
        mockCall({ page: 2, pageSize: 1 }, { count: 8 })

        const self = fixture.nativeElement as HTMLElement
        const selection = self.firstElementChild!.childNodes

        expect(selection.length).toBe(12)

        expect(selection[2].nodeName).toBe('A')
        expect(selection[2].textContent).toBe('1')
        expect(selection[3].nodeName).toBe('A')
        expect(selection[3].textContent).toBe('2')
        expect(selection[4].nodeName).toBe('A')
        expect(selection[4].textContent).toBe('3')
        expect(selection[5].nodeName).toBe('A')
        expect(selection[5].textContent).toBe('4')
        expect(selection[6].nodeName).toBe('A')
        expect(selection[6].textContent).toBe('5')
        expect(selection[7].nodeName).toBe('A')
        expect(selection[7].textContent).toBe('...')
        expect(selection[8].nodeName).toBe('A')
        expect(selection[8].textContent).toBe('8')
        expect(selection[9].nodeName).toBe('#comment')
    })

    it('eight pages with selection at 4', () => {
        mockCall({ page: 3, pageSize: 1 }, { count: 8 })

        const self = fixture.nativeElement as HTMLElement
        const selection = self.firstElementChild!.childNodes

        expect(selection.length).toBe(12)

        expect(selection[2].nodeName).toBe('A')
        expect(selection[2].textContent).toBe('1')
        expect(selection[3].nodeName).toBe('A')
        expect(selection[3].textContent).toBe('2')
        expect(selection[4].nodeName).toBe('A')
        expect(selection[4].textContent).toBe('3')
        expect(selection[5].nodeName).toBe('A')
        expect(selection[5].textContent).toBe('4')
        expect(selection[6].nodeName).toBe('A')
        expect(selection[6].textContent).toBe('5')
        expect(selection[7].nodeName).toBe('A')
        expect(selection[7].textContent).toBe('...')
        expect(selection[8].nodeName).toBe('A')
        expect(selection[8].textContent).toBe('8')
        expect(selection[9].nodeName).toBe('#comment')
    })

    it('eight pages with selection at 5', () => {
        mockCall({ page: 4, pageSize: 1 }, { count: 8 })

        const self = fixture.nativeElement as HTMLElement
        const selection = self.firstElementChild!.childNodes

        expect(selection.length).toBe(12)

        expect(selection[2].nodeName).toBe('A')
        expect(selection[2].textContent).toBe('1')
        expect(selection[3].nodeName).toBe('A')
        expect(selection[3].textContent).toBe('2')
        expect(selection[4].nodeName).toBe('A')
        expect(selection[4].textContent).toBe('3')
        expect(selection[5].nodeName).toBe('A')
        expect(selection[5].textContent).toBe('4')
        expect(selection[6].nodeName).toBe('A')
        expect(selection[6].textContent).toBe('5')
        expect(selection[7].nodeName).toBe('A')
        expect(selection[7].textContent).toBe('...')
        expect(selection[8].nodeName).toBe('A')
        expect(selection[8].textContent).toBe('8')
        expect(selection[9].nodeName).toBe('#comment')
    })

    it('eight pages with selection at 6', () => {
        mockCall({ page: 5, pageSize: 1 }, { count: 8 })

        const self = fixture.nativeElement as HTMLElement
        const selection = self.firstElementChild!.childNodes

        expect(selection.length).toBe(12)

        expect(selection[2].nodeName).toBe('A')
        expect(selection[2].textContent).toBe('1')
        expect(selection[3].nodeName).toBe('A')
        expect(selection[3].textContent).toBe('...')
        expect(selection[4].nodeName).toBe('A')
        expect(selection[4].textContent).toBe('4')
        expect(selection[5].nodeName).toBe('A')
        expect(selection[5].textContent).toBe('5')
        expect(selection[6].nodeName).toBe('A')
        expect(selection[6].textContent).toBe('6')
        expect(selection[7].nodeName).toBe('A')
        expect(selection[7].textContent).toBe('7')
        expect(selection[8].nodeName).toBe('A')
        expect(selection[8].textContent).toBe('8')
        expect(selection[9].nodeName).toBe('#comment')
    })

    it('eight pages with selection at 7', () => {
        mockCall({ page: 6, pageSize: 1 }, { count: 8 })

        const self = fixture.nativeElement as HTMLElement
        const selection = self.firstElementChild!.childNodes

        expect(selection.length).toBe(12)

        expect(selection[2].nodeName).toBe('A')
        expect(selection[2].textContent).toBe('1')
        expect(selection[3].nodeName).toBe('A')
        expect(selection[3].textContent).toBe('...')
        expect(selection[4].nodeName).toBe('A')
        expect(selection[4].textContent).toBe('4')
        expect(selection[5].nodeName).toBe('A')
        expect(selection[5].textContent).toBe('5')
        expect(selection[6].nodeName).toBe('A')
        expect(selection[6].textContent).toBe('6')
        expect(selection[7].nodeName).toBe('A')
        expect(selection[7].textContent).toBe('7')
        expect(selection[8].nodeName).toBe('A')
        expect(selection[8].textContent).toBe('8')
        expect(selection[9].nodeName).toBe('#comment')
    })

    it('eight pages with selection at 8', () => {
        mockCall({ page: 7, pageSize: 1 }, { count: 8 })

        const self = fixture.nativeElement as HTMLElement
        const selection = self.firstElementChild!.childNodes

        expect(selection.length).toBe(12)

        expect(selection[2].nodeName).toBe('A')
        expect(selection[2].textContent).toBe('1')
        expect(selection[3].nodeName).toBe('A')
        expect(selection[3].textContent).toBe('...')
        expect(selection[4].nodeName).toBe('A')
        expect(selection[4].textContent).toBe('4')
        expect(selection[5].nodeName).toBe('A')
        expect(selection[5].textContent).toBe('5')
        expect(selection[6].nodeName).toBe('A')
        expect(selection[6].textContent).toBe('6')
        expect(selection[7].nodeName).toBe('A')
        expect(selection[7].textContent).toBe('7')
        expect(selection[8].nodeName).toBe('A')
        expect(selection[8].textContent).toBe('8')
        expect(selection[9].nodeName).toBe('#comment')
    })

    it('100 pages with selection at 1', () => {
        mockCall({ page: 0, pageSize: 1 }, { count: 100 })

        const self = fixture.nativeElement as HTMLElement
        const selection = self.firstElementChild!.childNodes

        expect(selection.length).toBe(12)

        expect(selection[2].nodeName).toBe('A')
        expect(selection[2].textContent).toBe('1')
        expect(selection[3].nodeName).toBe('A')
        expect(selection[3].textContent).toBe('2')
        expect(selection[4].nodeName).toBe('A')
        expect(selection[4].textContent).toBe('3')
        expect(selection[5].nodeName).toBe('A')
        expect(selection[5].textContent).toBe('4')
        expect(selection[6].nodeName).toBe('A')
        expect(selection[6].textContent).toBe('5')
        expect(selection[7].nodeName).toBe('A')
        expect(selection[7].textContent).toBe('...')
        expect(selection[8].nodeName).toBe('A')
        expect(selection[8].textContent).toBe('100')
        expect(selection[9].nodeName).toBe('#comment')
    })

    it('100 pages with selection at 5', () => {
        mockCall({ page: 4, pageSize: 1 }, { count: 100 })

        const self = fixture.nativeElement as HTMLElement
        const selection = self.firstElementChild!.childNodes

        expect(selection.length).toBe(12)

        expect(selection[2].nodeName).toBe('A')
        expect(selection[2].textContent).toBe('1')
        expect(selection[3].nodeName).toBe('A')
        expect(selection[3].textContent).toBe('2')
        expect(selection[4].nodeName).toBe('A')
        expect(selection[4].textContent).toBe('3')
        expect(selection[5].nodeName).toBe('A')
        expect(selection[5].textContent).toBe('4')
        expect(selection[6].nodeName).toBe('A')
        expect(selection[6].textContent).toBe('5')
        expect(selection[7].nodeName).toBe('A')
        expect(selection[7].textContent).toBe('...')
        expect(selection[8].nodeName).toBe('A')
        expect(selection[8].textContent).toBe('100')
        expect(selection[9].nodeName).toBe('#comment')
    })

    it('100 pages with selection at 6', () => {
        mockCall({ page: 5, pageSize: 1 }, { count: 100 })

        const self = fixture.nativeElement as HTMLElement
        const selection = self.firstElementChild!.childNodes

        expect(selection.length).toBe(12)

        expect(selection[2].nodeName).toBe('A')
        expect(selection[2].textContent).toBe('1')
        expect(selection[3].nodeName).toBe('A')
        expect(selection[3].textContent).toBe('...')
        expect(selection[4].nodeName).toBe('A')
        expect(selection[4].textContent).toBe('5')
        expect(selection[5].nodeName).toBe('A')
        expect(selection[5].textContent).toBe('6')
        expect(selection[6].nodeName).toBe('A')
        expect(selection[6].textContent).toBe('7')
        expect(selection[7].nodeName).toBe('A')
        expect(selection[7].textContent).toBe('...')
        expect(selection[8].nodeName).toBe('A')
        expect(selection[8].textContent).toBe('100')
        expect(selection[9].nodeName).toBe('#comment')
    })

    it('100 pages with selection at 50', () => {
        mockCall({ page: 49, pageSize: 1 }, { count: 100 })

        const self = fixture.nativeElement as HTMLElement
        const selection = self.firstElementChild!.childNodes

        expect(selection.length).toBe(12)

        expect(selection[2].nodeName).toBe('A')
        expect(selection[2].textContent).toBe('1')
        expect(selection[3].nodeName).toBe('A')
        expect(selection[3].textContent).toBe('...')
        expect(selection[4].nodeName).toBe('A')
        expect(selection[4].textContent).toBe('49')
        expect(selection[5].nodeName).toBe('A')
        expect(selection[5].textContent).toBe('50')
        expect(selection[6].nodeName).toBe('A')
        expect(selection[6].textContent).toBe('51')
        expect(selection[7].nodeName).toBe('A')
        expect(selection[7].textContent).toBe('...')
        expect(selection[8].nodeName).toBe('A')
        expect(selection[8].textContent).toBe('100')
        expect(selection[9].nodeName).toBe('#comment')
    })

    it('100 pages with selection at 95', () => {
        mockCall({ page: 94, pageSize: 1 }, { count: 100 })

        const self = fixture.nativeElement as HTMLElement
        const selection = self.firstElementChild!.childNodes

        expect(selection.length).toBe(12)

        expect(selection[2].nodeName).toBe('A')
        expect(selection[2].textContent).toBe('1')
        expect(selection[3].nodeName).toBe('A')
        expect(selection[3].textContent).toBe('...')
        expect(selection[4].nodeName).toBe('A')
        expect(selection[4].textContent).toBe('94')
        expect(selection[5].nodeName).toBe('A')
        expect(selection[5].textContent).toBe('95')
        expect(selection[6].nodeName).toBe('A')
        expect(selection[6].textContent).toBe('96')
        expect(selection[7].nodeName).toBe('A')
        expect(selection[7].textContent).toBe('...')
        expect(selection[8].nodeName).toBe('A')
        expect(selection[8].textContent).toBe('100')
        expect(selection[9].nodeName).toBe('#comment')
    })

    it('100 pages with selection at 96', () => {
        mockCall({ page: 95, pageSize: 1 }, { count: 100 })

        const self = fixture.nativeElement as HTMLElement
        const selection = self.firstElementChild!.childNodes

        expect(selection.length).toBe(12)

        expect(selection[2].nodeName).toBe('A')
        expect(selection[2].textContent).toBe('1')
        expect(selection[3].nodeName).toBe('A')
        expect(selection[3].textContent).toBe('...')
        expect(selection[4].nodeName).toBe('A')
        expect(selection[4].textContent).toBe('96')
        expect(selection[5].nodeName).toBe('A')
        expect(selection[5].textContent).toBe('97')
        expect(selection[6].nodeName).toBe('A')
        expect(selection[6].textContent).toBe('98')
        expect(selection[7].nodeName).toBe('A')
        expect(selection[7].textContent).toBe('99')
        expect(selection[8].nodeName).toBe('A')
        expect(selection[8].textContent).toBe('100')
        expect(selection[9].nodeName).toBe('#comment')
    })

    it('100 pages with selection at 100', () => {
        mockCall({ page: 99, pageSize: 1 }, { count: 100 })

        const self = fixture.nativeElement as HTMLElement
        const selection = self.firstElementChild!.childNodes

        expect(selection.length).toBe(12)

        expect(selection[2].nodeName).toBe('A')
        expect(selection[2].textContent).toBe('1')
        expect(selection[3].nodeName).toBe('A')
        expect(selection[3].textContent).toBe('...')
        expect(selection[4].nodeName).toBe('A')
        expect(selection[4].textContent).toBe('96')
        expect(selection[5].nodeName).toBe('A')
        expect(selection[5].textContent).toBe('97')
        expect(selection[6].nodeName).toBe('A')
        expect(selection[6].textContent).toBe('98')
        expect(selection[7].nodeName).toBe('A')
        expect(selection[7].textContent).toBe('99')
        expect(selection[8].nodeName).toBe('A')
        expect(selection[8].textContent).toBe('100')
        expect(selection[9].nodeName).toBe('#comment')
    })
})
