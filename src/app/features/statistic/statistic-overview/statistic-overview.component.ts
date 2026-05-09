import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { StatisticTableComponent } from '../statistic-table/statistic-table.component';

@Component({
    selector: 'app-statistic-overview',
    standalone: true,
    imports: [
        CommonModule,
        StatisticTableComponent,
    ],
    templateUrl: './statistic-overview.component.html',
    styleUrl: './statistic-overview.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticOverviewComponent implements OnInit {


    ngOnInit(): void {
        console.log('Hello World');
     }

}
