import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Input,
  OnInit,
  forwardRef,
  inject,

} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';



@Component({
  selector: 'app-iniselectfield',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './iniselectfield.component.html', 
  styleUrl: './iniselectfield.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IniselectfieldComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IniselectfieldComponent implements ControlValueAccessor, OnInit {
  formControl: FormControl = new FormControl([]);

  destroyRef: DestroyRef = inject(DestroyRef);
  @Input() options: {value: unknown, display: string}[] = [];
  @Input() multiple: boolean = false;
  @Input() label: string = '';

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  disabled = false;
  value = '';

  writeValue(value: string): void {
    this.formControl.setValue(value, { emitEvent: false });
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }

  ngOnInit(): void {
    this.formControl.valueChanges.subscribe((value) => {
      this.onChange(value);
    });
  }
}
