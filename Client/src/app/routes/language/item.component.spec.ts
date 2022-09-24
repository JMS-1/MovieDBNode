import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LanguageItemComponent } from './item.component'

describe('ItemComponent', () => {
    let component: LanguageItemComponent
    let fixture: ComponentFixture<LanguageItemComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LanguageItemComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(LanguageItemComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
