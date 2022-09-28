import { ChangeDetectorRef, Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { IRecording } from 'src/api'
import { ContainerService } from 'src/app/services/containers/container.service'
import { GenreService } from 'src/app/services/genre/genre.service'
import { LanguageService } from 'src/app/services/languages/language.service'
import { SeriesService } from 'src/app/services/series/series.service'
import { ISelectItem } from 'src/app/utils'

import { RecordingService } from '../../services/recordings/recording.service'
import { FormComponent } from '../form.component'

@Component({
    selector: 'app-recording',
    styleUrls: ['./recording.component.scss'],
    templateUrl: './recording.component.html',
})
export class RecordingRouteComponent extends FormComponent<IRecording> {
    private _params?: Subscription

    private _series?: Subscription

    private _container?: Subscription

    private _language?: Subscription

    private _genre?: Subscription

    orderedSeries: ISelectItem[] = []

    orderedContainers: ISelectItem[] = []

    orderedLanguages: ISelectItem[] = []

    orderedGenres: ISelectItem[] = []

    protected getEditService(): RecordingService {
        return this._service
    }

    constructor(
        private readonly _service: RecordingService,
        private readonly _seriesService: SeriesService,
        private readonly _containerService: ContainerService,
        private readonly _languageService: LanguageService,
        private readonly _genreService: GenreService,
        private readonly _route: ActivatedRoute,
        private readonly _changes: ChangeDetectorRef
    ) {
        super()
    }

    override ngOnInit(): void {
        super.ngOnInit()

        this._params = this._route.params.subscribe((params) => {
            this.select(params['id'])

            this._service.id = this.editId === '@' ? '' : this.editId
        })

        this._series = this._seriesService.map.subscribe(
            (m) =>
                (this.orderedSeries = Object.keys(m)
                    .map((id) => ({ key: id, text: m[id].fullName || id }))
                    .sort((l, r) => l.text.toLocaleLowerCase().localeCompare(r.text.toLocaleLowerCase())))
        )

        this._container = this._containerService.map.subscribe(
            (m) =>
                (this.orderedContainers = Object.keys(m)
                    .map((id) => ({ key: id, text: m[id].fullName || id }))
                    .sort((l, r) => l.text.toLocaleLowerCase().localeCompare(r.text.toLocaleLowerCase())))
        )

        this._language = this._languageService.map.subscribe(
            (m) =>
                (this.orderedLanguages = Object.keys(m)
                    .map((id) => ({ key: id, text: m[id].name || id }))
                    .sort((l, r) => l.text.toLocaleLowerCase().localeCompare(r.text.toLocaleLowerCase())))
        )

        this._genre = this._genreService.map.subscribe(
            (m) =>
                (this.orderedGenres = Object.keys(m)
                    .map((id) => ({ key: id, text: m[id].name || id }))
                    .sort((l, r) => l.text.toLocaleLowerCase().localeCompare(r.text.toLocaleLowerCase())))
        )
    }

    override ngOnDestroy(): void {
        super.ngOnDestroy()

        this._container?.unsubscribe()
        this._genre?.unsubscribe()
        this._language?.unsubscribe()
        this._params?.unsubscribe()
        this._series?.unsubscribe()
    }

    onSave(): void {
        if (this.edit) {
            this._service.addOrUpdate(this.editId, this.edit)
        }
    }

    onConfirm(): void {
        this._service.remove(this.editId)

        this.confirm = false
    }

    get name(): string {
        return this.edit?.name || ''
    }

    set name(name: string) {
        if (this.edit) {
            this.edit.name = name
        }
    }

    get description(): string {
        return this.edit?.description || ''
    }

    set description(description: string) {
        if (this.edit) {
            this.edit.description = description
        }
    }

    get series(): string {
        return this.edit?.series || ''
    }

    set series(series: string) {
        if (this.edit) {
            this.edit.series = series || undefined
        }
    }

    get container(): string {
        return this.edit?.containerId || ''
    }

    set container(containerId: string) {
        if (this.edit) {
            this.edit.containerId = containerId || undefined
        }
    }

    get position(): string {
        return this.edit?.containerPosition || ''
    }

    set position(containerPosition: string) {
        if (this.edit) {
            this.edit.containerPosition = containerPosition
        }
    }

    get rentTo(): string {
        return this.edit?.rentTo || ''
    }

    set rentTo(rentTo: string) {
        if (this.edit) {
            this.edit.rentTo = rentTo
        }
    }

    get languages(): string[] {
        return this.edit?.languages || []
    }

    set languages(languages: string[]) {
        if (this.edit) {
            this.edit.languages = languages
        }
    }

    get genres(): string[] {
        return this.edit?.genres || []
    }

    set genres(genres: string[]) {
        if (this.edit) {
            this.edit.genres = genres
        }
    }
}
