import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GenreRouteComponent } from './genre.component'

describe('GenreComponent', () => {
    let component: GenreRouteComponent
    let fixture: ComponentFixture<GenreRouteComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GenreRouteComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(GenreRouteComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
