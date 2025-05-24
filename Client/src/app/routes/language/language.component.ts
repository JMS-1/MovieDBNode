import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MasterDetailComponent } from '../master-detail/master-detail.component';
import { LanguageListComponent } from './list.component';
import { LanguageFormComponent } from './form.component';

@Component({
  selector: 'app-language',
  styleUrls: ['./language.component.scss'],
  templateUrl: './language.component.html',
  imports: [
    MasterDetailComponent,
    LanguageListComponent,
    LanguageFormComponent,
  ],
})
export class LanguageRouteComponent implements OnInit, OnDestroy {
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
