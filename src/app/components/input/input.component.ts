import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'sm-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input({required: true}) label = '';
  @Input({required: true}) inputType: 'text' | 'number' | 'password' = 'text';
  @Input({required: true}) formControlName = '';
  @Input({required: true}) inputId = '';
  @Input() inputPlaceholder?: string;
  @Input() legend?: string;
  @Input() unit?: string;
  @Input() error?: string;
}