import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SeriesItemComponent } from './item.component'

describe('ItemComponent', () => {
    let component: SeriesItemComponent
    let fixture: ComponentFixture<SeriesItemComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SeriesItemComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(SeriesItemComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
