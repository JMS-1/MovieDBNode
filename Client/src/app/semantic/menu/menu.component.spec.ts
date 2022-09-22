import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SubMenuComponent } from './menu.component'

describe('MenuComponent', () => {
    let component: SubMenuComponent
    let fixture: ComponentFixture<SubMenuComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SubMenuComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(SubMenuComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
