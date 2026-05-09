import { Routes } from '@angular/router';
import { AppShellComponent } from './_layout/app-shell/app-shell.component';
import { QuestionComponent } from './features/question-answer/question.component';
import { FilterComponent } from './features/filter/filter.component';
import { StatisticOverviewComponent } from './features/statistic/statistic-overview/statistic-overview.component';
import { CreateUserComponent } from './auth/create-user/create-user.component';
import { LoginComponent } from './auth/create-user/login/login.component';



export const routes: Routes = [
    // { path: '', component: LoginComponent},
    // { path: '', component: CreateUserComponent},
    { path: '', component: AppShellComponent, children: [
        { path: '', component: QuestionComponent},
        { path: 'filter', component: FilterComponent},
        { path: 'statistik', component: StatisticOverviewComponent },


    ]},
    { path: '**', redirectTo: ''}

];
