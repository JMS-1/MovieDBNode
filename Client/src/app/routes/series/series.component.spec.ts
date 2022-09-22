import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SeriesRouteComponent } from './series.component'

describe('SeriesComponent', () => {
    let component: SeriesRouteComponent
    let fixture: ComponentFixture<SeriesRouteComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SeriesRouteComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(SeriesRouteComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
