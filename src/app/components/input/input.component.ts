import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'sm-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements ControlValueAccessor {

  @Input({ required: true }) value = '';
  @Input({ required: true }) label = 'Label';
  @Input({ required: true }) inputType: 'text' | 'number' | 'password' = 'text';
  @Input({ required: true }) inputId = '';
  @Input({ required: true }) formControl: FormControl = new FormControl();
  @Input() onChange() {};
  @Input() inputPlaceholder: string = '';
  @Input() legend?: string;
  @Input() unit?: string;
  @Input() error?: string;

  writeValue() {}
  registerOnChange() {}
  registerOnTouched() {}
}