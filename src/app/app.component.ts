import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AppMenuComponent} from './layout/app-menu/app-menu.component';
import {MatButtonModule} from '@angular/material/button';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AppMenuComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'crud-angular-material';
}
