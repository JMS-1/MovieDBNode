import { ChangeDetectorRef, Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { IRecording } from 'src/api'

import { RecordingService } from '../../services/recordings/recording.service'
import { FormComponent } from '../form.component'

@Component({
    selector: 'app-recording',
    styleUrls: ['./recording.component.scss'],
    templateUrl: './recording.component.html',
})
export class RecordingRouteComponent extends FormComponent<IRecording> {
    private _params?: Subscription

    protected getEditService(): RecordingService {
        return this._service
    }

    constructor(
        private readonly _service: RecordingService,
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
    }

    override ngOnDestroy(): void {
        super.ngOnDestroy()

        this._params?.unsubscribe()
    }
}
