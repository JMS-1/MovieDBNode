import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LanguageRouteComponent } from './language.component'

describe('LanguageComponent', () => {
    let component: LanguageRouteComponent
    let fixture: ComponentFixture<LanguageRouteComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LanguageRouteComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(LanguageRouteComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
