import { Component, Input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'icon-invisible',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './invisible.component.html',
  styleUrl: './invisible.component.scss'
})
export class InvisibleComponent {
  @Input() size?: string;
}
