import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GenreListComponent } from './list.component'

describe('ListComponent', () => {
    let component: GenreListComponent
    let fixture: ComponentFixture<GenreListComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GenreListComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(GenreListComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
