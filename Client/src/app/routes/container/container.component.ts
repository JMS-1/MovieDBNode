import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MasterDetailComponent } from '../master-detail/master-detail.component';
import { ContainerListComponent } from './list.component';
import { ContainerFormComponent } from './form.component';

@Component({
  selector: 'app-container',
  styleUrls: ['./container.component.scss'],
  templateUrl: './container.component.html',
  imports: [
    ContainerFormComponent,
    ContainerListComponent,
    MasterDetailComponent,
  ],
})
export class ContainerRouteComponent implements OnInit {
  private _query?: Subscription;

  selected = '';

  constructor(private readonly _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._query = this._route.params.subscribe(
      (params) => (this.selected = params['id']),
    );
  }

  ngOnDestroy(): void {
    this._query?.unsubscribe();
  }
}
