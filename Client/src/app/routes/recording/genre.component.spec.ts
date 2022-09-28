import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecordingGenreComponent } from './genre.component'

describe('RecordingGenreComponent', () => {
    let component: RecordingGenreComponent
    let fixture: ComponentFixture<RecordingGenreComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RecordingGenreComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(RecordingGenreComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
