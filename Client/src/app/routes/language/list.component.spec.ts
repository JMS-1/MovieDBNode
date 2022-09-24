import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LanguageListComponent } from './list.component'

describe('ListComponent', () => {
    let component: LanguageListComponent
    let fixture: ComponentFixture<LanguageListComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LanguageListComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(LanguageListComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
