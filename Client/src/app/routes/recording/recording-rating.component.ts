import { Component, Input } from '@angular/core';
import { IRecording } from 'src/api';
import { IWorkingCopy } from 'src/app/services/edit.service';

@Component({
  selector: 'app-recording-rating',
  imports: [],
  templateUrl: './recording-rating.component.html',
  styleUrl: './recording-rating.component.scss',
})
export class RecordingRatingComponent {
  @Input({ required: true }) edit!: IRecording & IWorkingCopy;
}
