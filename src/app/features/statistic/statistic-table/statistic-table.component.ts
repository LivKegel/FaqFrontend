import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation, type OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { StatisticService } from '../../../shared/services/statistic.service';
import { Statistic } from '../../../shared/interface/questionAnswer';
import { IniselectfieldComponent } from '../../../shared/input_fields/date-fields/inidatefield/iniselectfield/iniselectfield.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-statistic-table',
    standalone: true,
    imports: [
        CommonModule,
        StatisticTableComponent,
        MaterialModule,
        IniselectfieldComponent,
        FormsModule,
        ReactiveFormsModule,
    ],
    templateUrl: './statistic-table.component.html',
    styleUrl: './statistic-table.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class StatisticTableComponent implements OnInit {
    displayedColumns = ['name', 'count'];
    days = '7';
    daySelect = [{value: '7', display:'7 Tage'}, {value: '30' , display: '30 Tage'}, {value: '60', display: '60 Tage'}, {value: '90', display: '90 Tage'}, {value: '365', display: '365 Tage'}, {value: '99999', display: 'Alle'}]


    apiResult = {results: [], count: 0};
    // pageEvent: PageEvent | undefined;
    pageSize = 10;
    pageIndex = 0;

    datasource!: Statistic[];

    formGroup = new FormGroup({
        daysFormControl: new FormControl(this.days),
    });


    constructor(private statisticsService: StatisticService, private cd: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.statisticsService.getStatistics(Number(this.days), this.pageSize, this.pageIndex).subscribe((apiResult) => {
            this.apiResult = apiResult;
            this.datasource = apiResult.results;
            console.log(this.apiResult);
        });
        this.formGroup.controls['daysFormControl'].valueChanges.subscribe(value => {
            this.changeDays(Number(value));
          });
    }

    changeDays(days: number): void {
        console.log('changeDays');
        console.log(event);
        this.statisticsService.getStatistics(days, this.pageSize, this.pageIndex).subscribe((apiResult) => {
            this.apiResult = apiResult;
            this.datasource = apiResult.results;
            console.log(this.apiResult);
            this.cd.markForCheck();
        });
        
    }


}

