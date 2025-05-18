import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { IRecording, recordingDeleteType } from 'src/api';
import { IWorkingCopy } from 'src/app/services/edit.service';
import { ErrorsComponent } from '../errors/errors.component';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let $: any;

@Component({
  selector: 'app-recording-delete',
  imports: [CommonModule, ErrorsComponent],
  templateUrl: './recording-delete.component.html',
  styleUrl: './recording-delete.component.scss',
})
export class RecordingDeleteComponent {
  @Input({ required: true }) edit!: IRecording & IWorkingCopy;

  @ViewChild('selector') selector?: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    const elem = $(this.selector?.nativeElement);

    elem.dropdown({
      forceSelection: false,
      onChange: (s: string) => (this.edit.deleteType = parseInt(s, 10)),
    });

    setTimeout(() => {
      elem.dropdown(
        'set exactly',
        `${this.edit.deleteType ?? recordingDeleteType.None}`,
      );

      elem.css('visibility', '');
    }, 100);
  }

  ngOnDestroy(): void {
    $(this.selector?.nativeElement)?.dropdown('destroy');
  }
}
