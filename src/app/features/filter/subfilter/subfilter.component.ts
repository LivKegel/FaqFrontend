import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, type OnInit, ChangeDetectorRef } from '@angular/core';
import { Subfilter } from '../../../shared/interface/questionAnswer';

import { FilterService } from '../../../shared/services/filter.service';
import { FormsModule } from '@angular/forms';
import {
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
    CdkDragPlaceholder,
  } from '@angular/cdk/drag-drop';
import { LiveIconComponent } from '../../../shared/client/table/live-icon/live-icon.component';
import { BaseFilterComponent } from '../BaseFilterComponent';
import { Observable } from 'rxjs';

import { MaterialModule } from '../../../shared/material.module';


@Component({
    selector: 'app-subfilter',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        CdkDropListGroup, CdkDropList, CdkDrag, CdkDragPlaceholder,
        LiveIconComponent,
    ],
    templateUrl: './subfilter.component.html',
    styleUrl: './subfilter.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubfilterComponent extends BaseFilterComponent<Subfilter> implements OnInit {

    subfuilterColumns: string[] = ['position', 'name', 'live', 'actions',];

    @Input({required: true}) subfilters!: Subfilter[];

    @Input({required: true}) filterId!: number;


    constructor(filterService: FilterService,  cd: ChangeDetectorRef) {
        super(filterService, cd);
    }

    get filter(): Subfilter[] {
        return this.subfilters;
    }

    override createItem(item: Subfilter): Observable<Subfilter> {
        return this.filterService.createSubFilter(item);
    }
    
    override updateItem(item: Subfilter): Observable<any> {
        return this.filterService.updateSubFilter(item);
    }


    editSubfilter(event: MouseEvent, subfilter: Subfilter){
        this.editItem(event, subfilter);
    }

    cancelEditSubfilter(event: MouseEvent, subfilter: Subfilter){
        this.cancelEditItem(event, subfilter);
    }

    addSubfilter() {
        const order = this.subfilters.length + 1;
        this.subfilters.push({
            new: true,
            name: '',
            nameInput: '',
            order: order,
            live: false,
            liveInput: false,
            filter_group: this.filterId,
            // filter_group_index: index,
            edit: true,
        });
        this.table.renderRows();
    }

    deleteSubfilter(event: MouseEvent ,subfilter: Subfilter) {
        event.stopPropagation();

        this.subfilters = this.subfilters.filter(f => f !== subfilter);
        //todo: delete from backend

        if(!subfilter.new){
            this.filterService.deleteSubFilter(subfilter).subscribe();
        }

    }

    



    ngOnInit(): void {
        // this.filterIndex = this.subfilters[0].filter_group_index;
        // this.filterId = this.subfilters[0].filter_group;
        console.log('SubfilterComponent.ngOnInit()');
        console.log('this.subfilters', this.subfilters);
    }



}
