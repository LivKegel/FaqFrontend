import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { QuestionAnswer } from '../../../shared/interface/questionAnswer';
import { QuestionAnswerService } from '../../../shared/services/questionAnswer.service';
import { Subject, catchError, takeUntil } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { LiveIconComponent } from '../../../shared/client/table/live-icon/live-icon.component';

@Component({
    selector: 'app-list',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatIconModule,
        MatPaginatorModule,
        MatButtonModule,
        LiveIconComponent,
    ],
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnDestroy, OnInit { 
    static readonly NEW_QUESTION = 'new';
    @Output() questionEvent = new EventEmitter<QuestionAnswer | typeof ListComponent.NEW_QUESTION>();
    // @Input({required: true}) filterGroup: FilterGroup[] = [];

    apiResult = {results: [], count: 0};
    questionsAnswers: QuestionAnswer[] = [];
    readonly initialColumns: string[] = ['position', 'question', 'date', 'live', 'approved'];
    displayedColumns: string[] = [...this.initialColumns];
    pageEvent: PageEvent | undefined;
    pageSize = 10;
    pageIndex = 0;

    // Unsubscribe from all subscriptions when component is destroyed
    private unsubscribe$ = new Subject<void>();

    constructor(private questionAnswerService:  QuestionAnswerService, private cd: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.getQuestionsAnswers();
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    private getQuestionsAnswers() {
        this.questionAnswerService.getQuestionsAnswers(this.pageSize, this.pageIndex)
        .pipe(
            takeUntil(this.unsubscribe$),
            catchError(error => {
                console.error(`Error fetching questions and answers on page ${this.pageIndex}`, error);
                return [];
            })
        )
        .subscribe((apiResult) => {
            this.apiResult = apiResult;
            this.questionsAnswers = apiResult.results;
            this.cd.markForCheck();
            this.removeEmptyColumns();
        });
    }

    removeEmptyColumns() {
        this.displayedColumns = [...this.initialColumns];
        let statusFound = false;
        let quickNoteFound = false;
        let liveValidToFound = false;
        for (const question of this.questionsAnswers) {
            if (!statusFound && question.status != "") {
                this.displayedColumns.push('status');
                statusFound = true;
            }
            if (!quickNoteFound && question.quick_note != "") {
                this.displayedColumns.push('quick_note');
                quickNoteFound = true;
            }
            if (!liveValidToFound && question.live_valid_to != null) {
                this.displayedColumns.push('live_valid_to');
                liveValidToFound = true;
            }
            
            // If all columns are found, no need to continue the loop
            if (statusFound && quickNoteFound && liveValidToFound) {
                break;
            }
        }
    }
    
    addQuestion() {
        this.questionEvent.emit(ListComponent.NEW_QUESTION);
    }

    editQuestion(question: QuestionAnswer) {
        this.questionEvent.emit(question);
    }
    
    handlePageEvent(e: PageEvent) {
        this.pageEvent = e;
        this.pageSize = e.pageSize;
        this.pageIndex = e.pageIndex;
        this.getQuestionsAnswers();
    }
}