import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecordingSeriesComponent } from './series.component'

describe('RecordingSeriesComponent', () => {
    let component: RecordingSeriesComponent
    let fixture: ComponentFixture<RecordingSeriesComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RecordingSeriesComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(RecordingSeriesComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
