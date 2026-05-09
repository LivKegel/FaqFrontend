import { CommonModule } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FilterGroup, QuestionAnswer } from '../../../shared/interface/questionAnswer';
import { EditorModule, TINYMCE_SCRIPT_SRC  } from '@tinymce/tinymce-angular';
import { FormGroup, FormControl, Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InidatefieldComponent } from '../../../shared/input_fields/date-fields/inidatefield/inidatefield/inidatefield.component';
import { IniselectfieldComponent } from '../../../shared/input_fields/date-fields/inidatefield/iniselectfield/iniselectfield.component';
import { QuestionAnswerService } from '../../../shared/services/questionAnswer.service';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MaterialModule } from '../../../shared/material.module';


@Component({
  standalone: true,
  selector: 'app-questions-change-create',
  templateUrl: './questions-change-create.component.html',
  styleUrls: ['./questions-change-create.component.scss'],
  imports: [
    CommonModule,
    EditorModule,
    FormsModule,
    ReactiveFormsModule,
    InidatefieldComponent,
    IniselectfieldComponent,
    MaterialModule,
    DragDropModule,

  ],
  providers: [{provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js'}],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsChangeCreateComponent implements OnInit, OnDestroy{
  @Input() question!: QuestionAnswer;
  @Input({required: true}) filterGroups!: FilterGroup[];
  @Output() questionEvent = new EventEmitter<any>();

  public approvedOptions: {value: string, display: string}[] = [
    {value: "neue Anfrage", display: "neue Anfrage"}, 
    {value: "in Prüfung", display: "in Prüfung"}, 
    {value: "freigegeben", display: "freigegeben"}
  ];

  public filterOptions: {label: string, options: {value: string, display: string}[]}[] = [];

  showNotiz = false;
  lastUpdate = new Date();

  public questionAnswerForm: FormGroup =  new FormGroup({
    question : new FormControl("", Validators.required),
    answer : new FormControl("", Validators.required),
    tags: new FormControl(""),
    live: new FormControl(""),
    live_valid_to: new FormControl(""),
    status: new FormControl(""),
    status_valid_to: new FormControl(""),
    quick_note: new FormControl(""),
    long_note: new FormControl(""),
    approved: new FormControl(this.approvedOptions[0].value),
    contact_mail : new FormControl(""),
    email_has_sent: new FormControl(""),
    // filter: new FormControl("", Validators.required),
  });
  
  constructor(private fb: FormBuilder, private questionAnswerService: QuestionAnswerService) { }

  ngOnInit() {
    if(this.question){
      this.questionAnswerForm.patchValue(this.question);
      this.lastUpdate = this.question.create_date;

      // colapse notiz if empty
      this.showNotiz = this.question.quick_note !== "" || this.question.long_note !== "";
      this.createFilterOptions();
    }
  }

  ngOnDestroy() {
    if(this.question){
      const selectedFilters = this.selectedFilters;
      this.question = {...this.questionAnswerForm.value, filter:selectedFilters, id: this.question.id, new: this.question.new, edited: this.question.edited, saved: this.question.saved};
      this.questionEvent.emit(this.question);
    } 
  }
  
  onSubmit() {
    if(this.questionAnswerForm.valid){
      if(this.questionAnswerForm.valid){
        const selectedFilters = this.selectedFilters;
        this.question = {...this.questionAnswerForm.value, id: this.question?.id, saved:true, edited: false, filter: selectedFilters};
        this.questionEvent.emit(this.question);
        this.questionAnswerService.updateQuestionAnswer(this.question).subscribe();
      }
    }
  }

  get selectedFilters(){
    return this.filterGroups.map((filterGroup, index) => {
      const control = this.questionAnswerForm.get('filterGroup' + index);
      return control ? control.value : null;
    }).flat().filter(value => value !== '').map(value => parseInt(value));
  }

  markTabAsChanged(){
    if(this.questionAnswerForm.dirty){
      this.question.edited = true;
      this.question.saved = false;
    }
  }

  createFilterOptions(){
    
    this.filterGroups.forEach((filterGroup, index) => {
      const selectedFilters : string[] = this.question.filter.flatMap(filterId => 
        this.filterGroups.flatMap(filterGroup => 
          filterGroup.subfilters.map(subfilter => subfilter.id?.toString())
        ).includes(filterId?.toString()) ? [filterId?.toString()] : []
      );
      selectedFilters.map(filterId => filterId.toString());
      console.log(selectedFilters);
      this.filterOptions.push({
        label: filterGroup.name,
        options: filterGroup.subfilters.map(subfilter => {
          return {value: String(subfilter.id), display: subfilter.name}
        })
      });
      this.questionAnswerForm.addControl('filterGroup' + index, new FormControl(selectedFilters));
    });
  }

}



