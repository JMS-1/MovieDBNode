import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ContainerRouteComponent } from './container.component'

describe('ContainerComponent', () => {
    let component: ContainerRouteComponent
    let fixture: ComponentFixture<ContainerRouteComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ContainerRouteComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(ContainerRouteComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
