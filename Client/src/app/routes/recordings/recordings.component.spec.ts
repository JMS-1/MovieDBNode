import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecordingsRouteComponent } from './recordings.component'

describe('RecordingsComponent', () => {
    let component: RecordingsRouteComponent
    let fixture: ComponentFixture<RecordingsRouteComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RecordingsRouteComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(RecordingsRouteComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
