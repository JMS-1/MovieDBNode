import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SeriesListComponent } from './list.component'

describe('ListComponent', () => {
    let component: SeriesListComponent
    let fixture: ComponentFixture<SeriesListComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SeriesListComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(SeriesListComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})