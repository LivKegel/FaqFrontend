import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-toolbar-item',
    standalone: true,
    imports: [
        CommonModule,
    ],
    template: `
    <div class="toolbar-item" [class.align-left]="align === 'left'" [class.align-right]="align === 'right'" [class.align-center]="align === 'center'">
        <ng-content></ng-content>
    </div>
    `,
    styleUrl: './toolbar-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarItemComponent   {

    @Input({required: true}) align!: 'left' | 'right' | 'center';

}
