import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecordingLinkComponent } from './link.component'

describe('LinkComponent', () => {
    let component: RecordingLinkComponent
    let fixture: ComponentFixture<RecordingLinkComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RecordingLinkComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(RecordingLinkComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
