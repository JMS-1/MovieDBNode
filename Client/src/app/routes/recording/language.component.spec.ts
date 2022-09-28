import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecordingLanguageComponent } from './language.component'

describe('RecordingLanguageComponent', () => {
    let component: RecordingLanguageComponent
    let fixture: ComponentFixture<RecordingLanguageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RecordingLanguageComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(RecordingLanguageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
