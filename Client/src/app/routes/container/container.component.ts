import { Component, OnInit } from '@angular/core'
import { ContainerService } from 'src/app/services/containers/container.service'

@Component({
    selector: 'app-container',
    styleUrls: ['./container.component.scss'],
    templateUrl: './container.component.html',
})
export class ContainerRouteComponent implements OnInit {
    constructor(c: ContainerService) {}

    ngOnInit(): void {}
}
