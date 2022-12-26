import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  openSidenav = false;
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;

  onToggle(){
    this.sidenav?.toggle();
  }
}
