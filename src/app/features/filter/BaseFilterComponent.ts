import { ChangeDetectorRef, ViewChild } from "@angular/core";
import { FilterService } from "../../shared/services/filter.service";
import { MatTable } from "@angular/material/table";


import { Component } from '@angular/core';
import { FilterGroup, Subfilter } from "../../shared/interface/questionAnswer";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Observable } from "rxjs";

@Component({
    selector: 'app-base',
    template: `
    `,
    styles: [
    ]
})
// base-filter.component.ts
export abstract class BaseFilterComponent<T extends FilterGroup | Subfilter> {
    // Gemeinsame Eigenschaften und Methoden
    isChangeMode = false;
    isOrderChanged = false;
    isOrderSaved = false;

    abstract get filter(): T[];

    @ViewChild(MatTable) table !: MatTable<string>;

    constructor(protected filterService: FilterService, protected cd: ChangeDetectorRef) {}


    abstract createItem(item: T): Observable<T>;
    abstract updateItem(item: T): Observable<any>;

    enableChangeOrder() {
        this.isChangeMode = !this.isChangeMode;
        if(this.isChangeMode){
            this.isChangeMode = true;
            this.filter.map(filter => filter.edit = false);
        }
    }

    saveChangeOrder() {
        this.isOrderChanged = false;
        this.isOrderSaved = true;
    }

    dropFilter(event: CdkDragDrop<T[]>) {
        if (event.previousIndex !== event.currentIndex) {
            this.isOrderChanged = true;
            this.isOrderSaved = false;

            moveItemInArray(this.filter, event.previousIndex, event.currentIndex);
            this.filter.forEach((filter, index) => filter.order = index +1);
            this.table.renderRows();
        }
    }

    saveFilter(event: MouseEvent, item: T) {
        event.stopPropagation();

        if (item.nameInput) {
            item.edit = false;
            item.name = item.nameInput;
            item.live = item.liveInput;

            const observable: Observable<any> = item.new ? this.createItem(item) : this.updateItem(item);
            observable.subscribe({
                next: (result: T | any) => {
                    if (item.new) {
                        item.id = result.id;
                        item.new = false;
                    }
                    this.cd.markForCheck();
                },
                error: (error) => {
                    console.error(error);
                }
            });
        }
    }

    editItem(event: MouseEvent, item: T) {
        event.stopPropagation();
        item.edit = true;
    }

    cancelEditItem(event: MouseEvent, item: T) {
        event.stopPropagation();
        item.edit = false;
        item.nameInput = item.name;
        item.liveInput = item.live;
    }

    getPlaceholderStyle(width: number) : object{
        width -= 5;
        return {
            width: width  + 'px',
            'margin-right': '-'+ width  +'px'
        };
    }

}
