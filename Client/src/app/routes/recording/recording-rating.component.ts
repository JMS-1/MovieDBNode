import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IRecording } from 'src/api';
import { IWorkingCopy } from 'src/app/services/edit.service';
import { ErrorsComponent } from '../errors/errors.component';

@Component({
  selector: 'app-recording-rating',
  imports: [CommonModule, ErrorsComponent],
  templateUrl: './recording-rating.component.html',
  styleUrl: './recording-rating.component.scss',
})
export class RecordingRatingComponent {
  @Input({ required: true }) edit!: IRecording & IWorkingCopy;

  readonly stars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  get rating() {
    return this.edit.rating ?? 0;
  }

  set rating(rating: number) {
    this.edit.rating = rating || (null as unknown as number);
  }

  get hasRating() {
    return typeof this.edit.rating === 'number';
  }
}
