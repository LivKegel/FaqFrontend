import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, type OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { FilterService } from '../../shared/services/filter.service';
import { FilterGroup } from '../../shared/interface/questionAnswer';

import { FormsModule } from '@angular/forms';


import {
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
    CdkDragPlaceholder,
  } from '@angular/cdk/drag-drop';
import { SubfilterComponent } from './subfilter/subfilter.component';
import { LiveIconComponent } from '../../shared/client/table/live-icon/live-icon.component';
import { ToolbarComponent } from '../../shared/client/toolbar/toolbar.component';
import { ToolbarItemComponent } from '../../shared/client/toolbar/toolbar-item/toolbar-item.component';
import { Observable } from 'rxjs';
import { BaseFilterComponent } from './BaseFilterComponent';
import { MaterialModule } from '../../shared/material.module';

@Component({
    selector: 'app-filter',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        
        MaterialModule,
        CdkDropListGroup, CdkDropList, CdkDrag, CdkDragPlaceholder,
        SubfilterComponent,
        LiveIconComponent,
        [ToolbarComponent, ToolbarItemComponent],

    ],
    animations: [
        trigger('detailExpand', [
        state('collapsed,void', style({height: '0px', minHeight: '0'})),
        state('expanded', style({height: '*'})),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
    templateUrl: './filter.component.html',
    styleUrl: './filter.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent extends BaseFilterComponent<FilterGroup> implements OnInit{
    filterGroups: FilterGroup[] = [];
    readonly initialColumns: string[] = ['position', 'name', 'live', ];
    displayedColumns = [...this.initialColumns];
    columnsToDisplayWithExpand = [...this.displayedColumns, 'actions', 'expand' ];
    subfuilterColumns: string[] = ['position', 'name', 'live', 'actions',];
    
    expandedElement: FilterGroup | null = null;



    get filter(): FilterGroup[] {
        return this.filterGroups;
    }

    override createItem(item: FilterGroup): Observable<FilterGroup> {
        return this.filterService.createFilterGroup(item);
    }
    
    override updateItem(item: FilterGroup): Observable<any> {
        return this.filterService.updateFilterGroup(item);
    }




    constructor(filterService: FilterService,  cd: ChangeDetectorRef) {
        super(filterService, cd);
    }

    collapseRow(event:MouseEvent, row: FilterGroup|null){
        event.stopPropagation();
        if(!this.isChangeMode){
            if(this.expandedElement === row){
                this.expandedElement = null;
            }else{
                this.expandedElement = row;
            }
        }
    }
    override enableChangeOrder(): void {
        super.enableChangeOrder();
        this.expandedElement = null;
    }

    override saveChangeOrder(): void {
        super.saveChangeOrder();
        // let changeFilterObj: {id: number, order: number}[] = this.filter.map((filter, index)) => {id=filter.id, order=index+1};
        const changeFilterObj: {id: number|undefined, order: number}[] = this.filter.map((filter) => ({id: filter.id, order: filter.order}));

        // this.filterService.updateOrder(changeFilterObj).subscribe();
        this.filterService.updateOrder(changeFilterObj).subscribe(response => {
            console.log(response);
          }, error => {
            console.error(error);
          });
    }


    ngOnInit(){
        this.filterService.getFilterGroups().subscribe(data => {
            this.filterGroups = data;
            this.cd.markForCheck();

        });
    }


    addFilter() {
        const order = this.filterGroups.length + 1;
        this.filterGroups.push({
            new: true,
            name: '',
            nameInput: '',
            order: order,
            live: false,
            liveInput: false,
            subfilters: [],
            edit: true,
        });
        this.table.renderRows();
    }

    deleteFilter(event: MouseEvent ,filter: FilterGroup) {
        event.stopPropagation();
        this.filterGroups = this.filterGroups.filter(f => f !== filter);
        this.filterService.deleteFilterGroup(filter).subscribe();
    }

    editFilter(event: MouseEvent, item: FilterGroup) {
        this.editItem(event, item);
    }

    cancelEditFilter(event: MouseEvent, item: FilterGroup ) {
        this.cancelEditItem(event, item);
    }

 
}
