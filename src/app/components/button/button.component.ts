import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'sm-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input({required: true}) label = 'Label';
  @Input({required: true}) buttonStyle: 'filled' | 'outlined' | 'ghost' = 'filled';
  @Input() buttonType: 'button' | 'reset' | 'submit' = 'button';
  @Input() color?: 'neutral' | 'primary' | 'succes' | 'warning' | 'critical' = 'neutral';
  @Input() icon?: IconComponent;
  @Input() link?: string;
  @Input() externalLink?: boolean;

  styleClass = `button-${this.buttonStyle}`;
  colorClass = this.color ? ` button-${this.color}` : '';
  className = `button ${this.styleClass + this.colorClass}`
}
