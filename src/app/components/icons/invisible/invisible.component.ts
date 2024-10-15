import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
  selector: 'icon-invisible',
  standalone: true,
  imports: [],
  templateUrl: './invisible.component.html',
  styleUrl: './invisible.component.scss',
  schemas: [NO_ERRORS_SCHEMA]
})
export class InvisibleComponent {
  @Input() size?: string;
}
