import { Component, Input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'icon-visible',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './visible.component.html',
  styleUrl: './visible.component.scss'
})
export class VisibleComponent {
  @Input() size?: string;
}
