import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { ListComponent } from './list/list.component';
import { QuestionsChangeCreateComponent } from './questions-change-create/questions-change-create.component';
import {MatTabsModule} from '@angular/material/tabs';
import { FilterGroup, QuestionAnswer } from '../../shared/interface/questionAnswer';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FilterService } from '../../shared/services/filter.service';

@Component({
    selector: 'app-question',
    standalone: true,
    imports: [
        CommonModule,
        ListComponent,
        QuestionsChangeCreateComponent,
        MatTabsModule,
        MatTooltipModule,
        MatIconModule,
        MatButtonModule,
    ],
    templateUrl: './question.component.html',
    styleUrl: './question.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class QuestionComponent {

    tabs: (QuestionAnswer )[] = [];

    filterGroups: FilterGroup[] = [];

    selected = 0;

    private NEW_TAB = ListComponent.NEW_QUESTION;

    constructor(private cd: ChangeDetectorRef, private filterService: FilterService) {
        this.filterService.getFilterGroups().subscribe((filterGroups) => {
            this.filterGroups = filterGroups;
        });
    }

    changeActiveTab(tab: any) {
        this.selected = tab.index;
    }

    closeTab(question : QuestionAnswer, index: number) {
        if(question.edited){
            if(question.closed){
                this.removeTab(index);
                question.closed = false;
            }
            else{
                question.closed = true;
            }
        }else{
            this.removeTab(index);
        }
    }

    removeTab(index: number) {
        this.tabs.splice(index, 1);
    }

    handleQuestionEvent(newTab: any): void {
        const existingTabIndex = this.tabs.findIndex(tab => tab.id === newTab.id);
        if (newTab === this.NEW_TAB) {
            this.tabs.push(this.createNewQuestion());
            this.selected = this.tabs.length;
            return;
        }

        //-1 means not found
        if (existingTabIndex !== -1) {
            //+1 because the index starts at 0(list) and the tabs start at 1(visual)
            this.selected = existingTabIndex + 1;
            return;
        }

        this.tabs.push(newTab);
        this.selected = this.tabs.length;
    }
    
    updateQuestionTab(question: QuestionAnswer, index: number) {
        console.log("updateQuestionTab")
        if(this.tabs[index]){
            this.tabs[index] = question;
            console.log(this.tabs[index]);
        }
    }

    private createNewQuestion(): QuestionAnswer {
        return {
            new: true,
            closed: false,
            edited: false,
            saved: false,
            question: "",
            answer: "",
            createdAt: new Date(),
            live: false,
            liveValidUntil: "",
            status: "",
            statusValidUntil: "",
            tags: [],
            quickNote: "",
            approved: "",
            updatedAt: "",
            updatedBy: "",
            longNote: "",
            contactMail: "",
            emailHasSent: false,
            filters: [],
        };
    }

}
