import * as angular from '@angular/core';

import { IRecording, recordingContainerType } from '../../../api';
import { IWorkingCopy } from '../../services/edit.service';
import { CommonModule } from '@angular/common';
import { ErrorsComponent } from '../errors/errors.component';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let $: any;

@angular.Component({
  selector: 'app-recording-type',
  styleUrls: ['./type.component.scss'],
  templateUrl: './type.component.html',
  imports: [CommonModule, ErrorsComponent],
})
export class RecordingTypeComponent
  implements angular.AfterViewInit, angular.OnDestroy
{
  @angular.ViewChild('selector') selector?: angular.ElementRef<HTMLDivElement>;

  @angular.Input({ required: true }) edit!: IRecording & IWorkingCopy;

  ngAfterViewInit(): void {
    const elem = $(this.selector?.nativeElement);

    elem.dropdown({
      forceSelection: false,
      onChange: (s: string) => (this.edit.containerType = parseInt(s, 10)),
    });

    setTimeout(() => {
      elem.dropdown(
        'set exactly',
        `${this.edit.containerType ?? recordingContainerType.Undefined}`,
      );

      elem.css('visibility', '');
    }, 100);
  }

  ngOnDestroy(): void {
    $(this.selector?.nativeElement)?.dropdown('destroy');
  }
}
