import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-toolbar',
    standalone: true,
    imports: [
        CommonModule,
    ],
    template: `
                <div class="tool-toolbar">
                    <ng-content></ng-content>
                </div>
            `,
    styleUrl: './toolbar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
    @Input() items: ToolbarItem[] = [];


}
interface ToolbarItem {

  }