import { CommonModule, registerLocaleData } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  forwardRef,
  inject,
  Input,
  LOCALE_ID,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import localeDe from '@angular/common/locales/de';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

registerLocaleData(localeDe);

@Component({
  selector: 'app-inidatefield',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './inidatefield.component.html',
  styleUrl: './inidatefield.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: LOCALE_ID, useValue: 'de-DE' },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InidatefieldComponent),
      multi: true,
    },
    
  ],
})
export class InidatefieldComponent implements ControlValueAccessor, OnInit {
  @Input() label: string = '';


  formControl: FormControl = new FormControl<Date>(new Date());
  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('de-DE');
    this.dateAdapter.getFirstDayOfWeek = () => 1;
    this.dateAdapter.getDayOfWeekNames = () => [
      'So',
      'Mo',
      'Di',
      'Mi',
      'Do',
      'Fr',
      'Sa',
    ];
  }


  destroyRef: DestroyRef = inject(DestroyRef);

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  disabled = false;
  value = '';
  
  clearValue() {
    this.formControl.setValue(null);
  }

  nextDay() {
    this.formControl.setValue(
      new Date(
        this.formControl.value.setDate(this.formControl.value.getDate() + 1)
      )
    );
  }
  prevDay() {
    this.formControl.setValue(
      new Date(
        this.formControl.value.setDate(this.formControl.value.getDate() - 1)
      )
    );
  }

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
