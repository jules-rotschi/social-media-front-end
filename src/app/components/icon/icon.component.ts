import { Component, Input } from '@angular/core';

@Component({
  selector: 'sm-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
  @Input() size = '24';
}