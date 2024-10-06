import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'sm-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent implements OnInit {
  @Input({required: true}) label = 'Label';
  @Input({required: true}) buttonStyle: 'filled' | 'outlined' | 'ghost' = 'filled';
  @Input() buttonType: 'button' | 'reset' | 'submit' = 'button';
  @Input() color?: 'neutral' | 'primary' | 'succes' | 'warning' | 'critical' = 'neutral';
  @Input() icon?: IconComponent;
  @Input() link?: string;
  @Input() externalLink?: boolean;

  styleClass = '';
  colorClass = '';
  className = '';

  ngOnInit(): void {
    this.styleClass = `button-${this.buttonStyle}`;
    this.colorClass = this.color ? ` button-${this.color}` : '';
    this.className = `button ${this.styleClass + this.colorClass}`
  }
}
