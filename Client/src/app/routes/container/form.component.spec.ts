import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ContainerFormComponent } from './form.component'

describe('FormComponent', () => {
    let component: ContainerFormComponent
    let fixture: ComponentFixture<ContainerFormComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ContainerFormComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(ContainerFormComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
