import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { v4 as uuid } from 'uuid';

import * as api from '../../../api';
import { ConfigService } from '../config/config.service';
import { GraphQLService } from '../graphql/graphql.service';
import { ISeriesNode, SeriesService } from '../series/series.service';

export const recordingProps = `
    _id name rentTo series containerId containerPosition containerType created description fullName genres languages rating deleteType
    links { description name url }
`;

const queryRecordings = `
  query (
      $correlationId: ID
      $deleteType: RecordingDeleteType
      $firstPage: Int!
      $forExport: Boolean
      $fullName: String
      $genres: [String!]
      $language: String
      $pageSize: Int!
      $rating: Int
      $rent: Boolean
      $series: [String!]
      $sort: RecordingSort!
      $sortOrder: SortDirection!
  ) {
      recordings {
          query(
              correlationId: $correlationId
              deleteType: $deleteType
              firstPage: $firstPage
              forExport: $forExport
              fullName: $fullName
              genres: $genres
              language: $language
              pageSize: $pageSize
              rating: $rating
              rent: $rent
              series: $series
              sort: $sort
              sortOrder: $sortOrder
          ) {
              correlationId count total
              genres { _id count }
              languages { _id count }
              view { ${recordingProps} }
          }
      }
  }
`;

const initialFilter: api.IRecordingQueryRequest = {
  correlationId: '',
  deleteType: undefined,
  firstPage: 0,
  forExport: false,
  fullName: '',
  genres: [],
  language: '',
  pageSize: 15,
  rating: undefined,
  rent: undefined,
  series: [],
  sort: 'fullName',
  sortOrder: 'Ascending',
};

@Injectable({ providedIn: 'root' })
export class RecordingsService implements OnDestroy {
  private readonly _query = new BehaviorSubject<api.IRecordingQueryResult>({
    correlationId: '',
    count: 0,
    genres: [],
    languages: [],
    total: 0,
    view: [],
  });

  private _rootSeries = '';

  private readonly _seriesWatch: Subscription;

  private _seriesMap: Record<string, ISeriesNode> = {};

  constructor(
    private readonly _gql: GraphQLService,
    series: SeriesService,
    private readonly _config: ConfigService,
  ) {
    this._seriesWatch = series.map.subscribe(
      (map) => ((this._seriesMap = map), this.reload()),
    );

    this.reload();
  }

  get result(): Observable<api.IRecordingQueryResult> {
    return this._query;
  }

  private _filter: api.IRecordingQueryRequest = JSON.parse(
    JSON.stringify(initialFilter),
  );

  get pageSize(): number {
    return this._filter.pageSize;
  }

  set pageSize(pageSize: number) {
    if (
      pageSize < 1 ||
      !Number.isSafeInteger(pageSize) ||
      pageSize === this._filter.pageSize
    ) {
      return;
    }

    this._filter.pageSize = pageSize;
    this.reload();
  }

  get page(): number {
    return this._filter.firstPage;
  }

  set page(page: number) {
    if (
      page < 0 ||
      !Number.isSafeInteger(page) ||
      page === this._filter.firstPage
    ) {
      return;
    }

    this.reload(page);
  }

  get language(): string {
    return this._filter.language || '';
  }

  set language(language: string) {
    if (language === this._filter.language) {
      return;
    }

    this._filter.language = language;
    this.reload();
  }

  get rent(): boolean | undefined {
    return this._filter.rent;
  }

  set rent(rent: boolean | undefined) {
    if (rent === this._filter.rent) {
      return;
    }

    this._filter.rent = rent;
    this.reload();
  }

  get fullName(): string {
    return this._filter.fullName || '';
  }

  set fullName(fullName: string) {
    if (fullName === this._filter.fullName) {
      return;
    }

    this._filter.fullName = fullName;
    this.reload();
  }

  get series(): string {
    return this._rootSeries || '';
  }

  set series(series: string) {
    if (series === this._rootSeries) {
      return;
    }

    this._rootSeries = series;
    this.reload();
  }

  get genres(): string[] {
    return this._filter.genres || [];
  }

  set genres(genres: string[]) {
    if (JSON.stringify(genres) === JSON.stringify(this._filter.genres)) {
      return;
    }

    this._filter.genres = genres;
    this.reload();
  }

  get rating(): number | undefined {
    return this._filter.rating;
  }

  set rating(rating: number | undefined) {
    if (rating === this._filter.rating) {
      return;
    }

    this._filter.rating = rating;
    this.reload();
  }

  get deleteType(): api.recordingDeleteType | undefined {
    return this._filter.deleteType;
  }

  set deleteType(deleteType: api.recordingDeleteType | undefined) {
    if (deleteType === this._filter.deleteType) {
      return;
    }

    this._filter.deleteType = deleteType;
    this.reload();
  }

  get sortColumn(): api.IRecordingQueryRequest['sort'] {
    return this._filter.sort;
  }

  get sortOrder(): api.IRecordingQueryRequest['sortOrder'] {
    return this._filter.sortOrder;
  }

  sort(column: api.IRecordingQueryRequest['sort']): void {
    if (column === this._filter.sort) {
      this._filter.sortOrder =
        this._filter.sortOrder === 'Ascending' ? 'Descending' : 'Ascending';
    } else {
      this._filter.sort = column;
      this._filter.sortOrder =
        column === 'fullName' ? 'Ascending' : 'Descending';
    }

    this.reload();
  }

  reset(): void {
    this._filter = JSON.parse(JSON.stringify(initialFilter));
    this._rootSeries = '';

    this.reload();
  }

  reload(firstPage = 0): void {
    this._filter.firstPage = firstPage;

    const correlationId = uuid();

    const filter = this.filter;

    filter.correlationId = correlationId;

    this._gql.call(queryRecordings, filter, (data) => {
      const result = data.recordings.query;

      if (result.correlationId !== filter.correlationId) {
        return;
      }

      this._query?.next(result);
    });
  }

  openExport(): void {
    const filter = this.filter;

    this._gql.call(
      queryRecordings,
      {
        ...filter,
        correlationId: uuid(),
        firstPage: 0,
        forExport: true,
        pageSize: 100000,
        sort: 'fullName',
        sortOrder: 'Ascending',
      },
      () => window.open(`${this._config.server}/export`, '_blank'),
    );
  }

  private get filter(): api.IRecordingQueryRequest {
    const filter: api.IRecordingQueryRequest = JSON.parse(
      JSON.stringify(this._filter),
    );

    if (this._rootSeries) {
      filter.series = (
        this._seriesMap[this._rootSeries]?.allChildren || []
      ).concat(this._rootSeries);
    }

    if (filter.deleteType)
      filter.deleteType = api.recordingDeleteType[
        filter.deleteType
      ] as unknown as api.recordingDeleteType;

    return filter;
  }

  ngOnDestroy(): void {
    this._seriesWatch.unsubscribe();

    this._query.complete();
  }
}
