import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { IGenre } from '../../../api';
import { GenreService } from '../../services/genre/genre.service';
import { GenreItemComponent } from './item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-genre-list',
  styleUrls: ['./list.component.scss'],
  templateUrl: './list.component.html',
  imports: [GenreItemComponent, CommonModule],
})
export class GenreListComponent implements OnInit, OnDestroy {
  private _query?: Subscription;

  constructor(private readonly _service: GenreService) {}

  @Input() selected = '';

  items: IGenre[] = [];

  ngOnInit(): void {
    this._query = this._service.map.subscribe(
      (m) =>
        (this.items = Object.keys(m)
          .map((l) => m[l])
          .sort((l, r) =>
            (l.name || l._id)
              .toLocaleLowerCase()
              .localeCompare((r.name || r._id).toLocaleLowerCase()),
          )),
    );
  }

  ngOnDestroy(): void {
    this._query?.unsubscribe();
  }
}
