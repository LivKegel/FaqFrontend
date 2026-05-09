import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-live-icon',
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        MatCheckboxModule,
        FormsModule,
    ],
    template: `
        @if (live){
            <mat-icon class="live">check</mat-icon>
        }@else{
            <mat-icon class="no-live">close</mat-icon>
        }
    `,
    styleUrl: './live-icon.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveIconComponent{
    @Input({required: true}) live!: boolean;

}
