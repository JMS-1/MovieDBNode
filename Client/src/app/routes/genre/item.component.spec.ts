import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GenreItemComponent } from './item.component'

describe('ItemComponent', () => {
    let component: GenreItemComponent
    let fixture: ComponentFixture<GenreItemComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GenreItemComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(GenreItemComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
