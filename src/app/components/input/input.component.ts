import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'sm-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements OnInit {
  @Input({required: true}) label = 'Label';
  @Input({required: true}) inputType: 'text' | 'number' | 'password' = 'text';
  @Input({required: true}) formControlName = '';
  @Input({required: true}) inputId = '';
  @Input() inputPlaceholder: string = '';
  @Input() legend?: string;
  @Input() unit?: string;
  @Input() error?: string;

  ngOnInit(): void {
    console.log(this.label);
    
  }
}