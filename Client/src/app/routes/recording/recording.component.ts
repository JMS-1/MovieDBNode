import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { IRecording } from 'src/api'
import { RecordingService } from 'src/app/services/recordings/recording.service'

@Component({
    selector: 'app-recording',
    styleUrls: ['./recording.component.scss'],
    templateUrl: './recording.component.html',
})
export class RecordingRouteComponent implements OnInit {
    private _byId?: Subscription

    private _query?: Subscription

    recording?: IRecording = undefined

    selected = ''

    constructor(private readonly _service: RecordingService, private readonly _route: ActivatedRoute) {}

    ngOnInit(): void {
        this._query = this._route.params.subscribe((params) => {
            this._byId?.unsubscribe()

            this.selected = params['id']
            this.recording = undefined

            this._byId = this._service.findById(this.selected).subscribe((r) => (this.recording = r))
        })
    }

    ngOnDestroy(): void {
        this._byId?.unsubscribe()
        this._query?.unsubscribe()
    }
}
