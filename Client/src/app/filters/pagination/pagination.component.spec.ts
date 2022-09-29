/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BehaviorSubject } from 'rxjs'

import { PaginationFilterComponent } from './pagination.component'

import { IRecordingQueryResult } from '../../../api'
import { RecordingsService } from '../../services/recordings/recordings.service'

interface IRecordinService extends Partial<RecordingsService> {
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
            providers: [{ provide: RecordingsService, useValue: recordings }],
        }).compileComponents()

        fixture = TestBed.createComponent(PaginationFilterComponent)

        component = fixture.componentInstance

        fixture.detectChanges()
    })

    const mockCall = (params: Partial<RecordingsService>, result: Partial<IRecordingQueryResult>): void => {
        Object.assign(recordings, params)

        recordings.result.next({ ...initialResult, ...result })

        fixture.detectChanges()
    }

    const fullTest = (count: number, page: number, ...fields: string[]): void => {
        mockCall({ page, pageSize: 1 }, { count })

        const self = fixture.nativeElement as HTMLElement
        const selection = self.firstElementChild!.childNodes

        expect(selection.length).toBe(12)

        expect(selection[2].nodeName).toBe('A')
        expect(selection[2].textContent).toBe('1')
        expect(selection[3].nodeName).toBe('A')
        expect(selection[3].textContent).toBe(fields[0])
        expect(selection[4].nodeName).toBe('A')
        expect(selection[4].textContent).toBe(fields[1])
        expect(selection[5].nodeName).toBe('A')
        expect(selection[5].textContent).toBe(fields[2])
        expect(selection[6].nodeName).toBe('A')
        expect(selection[6].textContent).toBe(fields[3])
        expect(selection[7].nodeName).toBe('A')
        expect(selection[7].textContent).toBe(fields[4])
        expect(selection[8].nodeName).toBe('A')
        expect(selection[8].textContent).toBe(`${count}`)
        expect(selection[9].nodeName).toBe('#comment')
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
        fullTest(7, 0, '2', '3', '4', '5', '6', '7')
    })

    it('eight pages with selection at 1', () => {
        fullTest(8, 0, '2', '3', '4', '5', '...')
    })

    it('eight pages with selection at 2', () => {
        fullTest(8, 1, '2', '3', '4', '5', '...')
    })

    it('eight pages with selection at 3', () => {
        fullTest(8, 2, '2', '3', '4', '5', '...')
    })

    it('eight pages with selection at 4', () => {
        fullTest(8, 3, '2', '3', '4', '5', '...')
    })

    it('eight pages with selection at 5', () => {
        fullTest(8, 4, '2', '3', '4', '5', '...')
    })

    it('eight pages with selection at 6', () => {
        fullTest(8, 5, '...', '4', '5', '6', '7')
    })

    it('eight pages with selection at 7', () => {
        fullTest(8, 6, '...', '4', '5', '6', '7')
    })

    it('eight pages with selection at 8', () => {
        fullTest(8, 7, '...', '4', '5', '6', '7')
    })

    it('100 pages with selection at 1', () => {
        fullTest(100, 0, '2', '3', '4', '5', '...')
    })

    it('100 pages with selection at 5', () => {
        fullTest(100, 4, '2', '3', '4', '5', '...')
    })

    it('100 pages with selection at 6', () => {
        fullTest(100, 5, '...', '5', '6', '7', '...')
    })

    it('100 pages with selection at 50', () => {
        fullTest(100, 49, '...', '49', '50', '51', '...')
    })

    it('100 pages with selection at 95', () => {
        fullTest(100, 94, '...', '94', '95', '96', '...')
    })

    it('100 pages with selection at 96', () => {
        fullTest(100, 95, '...', '96', '97', '98', '99')
    })

    it('100 pages with selection at 100', () => {
        fullTest(100, 99, '...', '96', '97', '98', '99')
    })
})
