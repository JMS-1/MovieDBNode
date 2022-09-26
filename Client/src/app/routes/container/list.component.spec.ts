import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ContainerListComponent } from './list.component'

describe('ListComponent', () => {
    let component: ContainerListComponent
    let fixture: ComponentFixture<ContainerListComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ContainerListComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(ContainerListComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
