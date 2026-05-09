import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FaqFrontend';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitzer: DomSanitizer,
  ){
    console.log('AppComponent');
    this.matIconRegistry.addSvgIcon(
      'filter_icon',
      this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/manage_search.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'statistics_icon',
      this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/leaderboard.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'drag_pan_icon',
      this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/drag_pan.svg')
    );
  }
}