import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PaginationFilterComponent } from './pagination.component'

describe('PaginationComponent', () => {
    let component: PaginationFilterComponent
    let fixture: ComponentFixture<PaginationFilterComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PaginationFilterComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(PaginationFilterComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
