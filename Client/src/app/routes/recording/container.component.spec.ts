import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecordingContainerComponent } from './container.component'

describe('RecordingContainerComponent', () => {
    let component: RecordingContainerComponent
    let fixture: ComponentFixture<RecordingContainerComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RecordingContainerComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(RecordingContainerComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
