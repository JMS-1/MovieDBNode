import { Component, input } from '@angular/core';
import { ValidationError } from 'fastest-validator';

@Component({
  selector: 'app-validation-errors',
  styleUrls: ['./errors.component.scss'],
  templateUrl: './errors.component.html',
  imports: [],
})
export class ErrorsComponent {
  readonly list = input<ValidationError[]>();
}
