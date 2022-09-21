import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SeriesFilterComponent } from './series.component'

describe('SeriesComponent', () => {
    let component: SeriesFilterComponent
    let fixture: ComponentFixture<SeriesFilterComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SeriesFilterComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(SeriesFilterComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
