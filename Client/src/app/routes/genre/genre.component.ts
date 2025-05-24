import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MasterDetailComponent } from '../master-detail/master-detail.component';
import { GenreListComponent } from './list.component';
import { GenreFormComponent } from './form.component';

@Component({
  selector: 'app-genre',
  styleUrls: ['./genre.component.scss'],
  templateUrl: './genre.component.html',
  imports: [MasterDetailComponent, GenreListComponent, GenreFormComponent],
})
export class GenreRouteComponent implements OnInit, OnDestroy {
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
