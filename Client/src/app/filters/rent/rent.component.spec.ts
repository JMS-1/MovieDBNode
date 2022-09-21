import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RentFilterComponent } from './rent.component'

describe('RentComponent', () => {
    let component: RentFilterComponent
    let fixture: ComponentFixture<RentFilterComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RentFilterComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(RentFilterComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
