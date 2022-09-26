import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ContainerIconComponent } from './icon.component'

describe('IconComponent', () => {
    let component: ContainerIconComponent
    let fixture: ComponentFixture<ContainerIconComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ContainerIconComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(ContainerIconComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
