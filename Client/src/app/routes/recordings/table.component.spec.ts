import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecordingTableComponent } from './table.component'

describe('TableComponent', () => {
    let component: RecordingTableComponent
    let fixture: ComponentFixture<RecordingTableComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RecordingTableComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(RecordingTableComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
