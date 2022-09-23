import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecordingRowComponent } from './row.component'

describe('RowComponent', () => {
    let component: RecordingRowComponent
    let fixture: ComponentFixture<RecordingRowComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RecordingRowComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(RecordingRowComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
