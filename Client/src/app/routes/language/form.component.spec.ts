import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LanguageFormComponent } from './form.component'

describe('FormComponent', () => {
    let component: LanguageFormComponent
    let fixture: ComponentFixture<LanguageFormComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LanguageFormComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(LanguageFormComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
