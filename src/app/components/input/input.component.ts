import { Component, forwardRef, Input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { VisibleComponent } from '../icons/visible/visible.component';
import { InvisibleComponent } from '../icons/invisible/invisible.component';

@Component({
  selector: 'sm-input',
  standalone: true,
  imports: [ReactiveFormsModule, VisibleComponent, InvisibleComponent],
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
export class InputComponent implements ControlValueAccessor, OnInit {

  @Input({ required: true }) value = '';
  @Input({ required: true }) label = 'Label';
  @Input({ required: true }) inputType: 'text' | 'number' | 'password' = 'text';
  @Input({ required: true }) inputId = '';
  @Input({ required: true }) formControl: FormControl = new FormControl();
  @Input() inputPlaceholder: string = '';
  @Input() legend?: string;
  @Input() unit?: string;
  @Input() invalid?: boolean;
  @Input() error?: string;
  @Input() onChange() {};

  
  domType = signal(this.inputType);
  
  ngOnInit() {
    this.domType = signal(this.inputType);
  }

  isPasswordVisible = signal(false);

  togglePasswordVisibility() {
    this.isPasswordVisible.update((c) => !c);
    this.domType.update((current) => {
      switch (current) {
        case 'password' :
          return 'text'
        case 'text' :
          return 'password'
        default :
          return 'password'
      }
    })
  }

  writeValue() {}
  registerOnChange() {}
  registerOnTouched() {}
}