import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GenreFormComponent } from './form.component'

describe('FormComponent', () => {
    let component: GenreFormComponent
    let fixture: ComponentFixture<GenreFormComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GenreFormComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(GenreFormComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
