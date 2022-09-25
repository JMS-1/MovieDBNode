import { Component, Input } from '@angular/core'
import { ValidationError } from 'fastest-validator'
import { IWorkingCopy } from 'src/app/services/workingCopy'

@Component({
    selector: 'app-validation-errors',
    styleUrls: ['./errors.component.scss'],
    templateUrl: './errors.component.html',
})
export class ErrorsComponent {
    @Input() edit: IWorkingCopy = undefined as unknown as IWorkingCopy

    get hasErrors(): boolean {
        return !!this.edit?.validationErrors
    }

    get errors(): ValidationError[] {
        const errors = this.edit?.validationErrors || {}

        return Object.keys(errors).flatMap((f) => errors[f])
    }
}
