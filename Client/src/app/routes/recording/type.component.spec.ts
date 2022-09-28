import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecordingTypeComponent } from './type.component'

describe('RecordingTypeComponent', () => {
    let component: RecordingTypeComponent
    let fixture: ComponentFixture<RecordingTypeComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RecordingTypeComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(RecordingTypeComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
