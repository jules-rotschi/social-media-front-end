import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
  selector: 'icon-visible',
  standalone: true,
  imports: [],
  templateUrl: './visible.component.html',
  styleUrl: './visible.component.scss',
  schemas: [NO_ERRORS_SCHEMA]
})
export class VisibleComponent {
  @Input() size?: string;
}
