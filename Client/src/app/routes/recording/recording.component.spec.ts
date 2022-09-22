import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecordingRouteComponent } from './recording.component'

describe('RecordingComponent', () => {
    let component: RecordingRouteComponent
    let fixture: ComponentFixture<RecordingRouteComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RecordingRouteComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(RecordingRouteComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
