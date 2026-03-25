import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AppMenuComponent} from '../app-menu/app-menu.component';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, AppMenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
