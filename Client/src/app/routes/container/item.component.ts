import { Component, Input } from '@angular/core';

import { IContainer } from '../../services/containers/container.service';
import { RouterLink } from '@angular/router';
import { ContainerIconComponent } from './icon.component';

@Component({
  selector: 'app-container-item',
  styleUrls: ['./item.component.scss'],
  templateUrl: './item.component.html',
  imports: [RouterLink, ContainerIconComponent],
})
export class ContainerItemComponent {
  @Input() container: IContainer = undefined as unknown as IContainer;
}
