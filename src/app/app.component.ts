import { AuthService } from 'src/app/auth/auth.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  openSidenav = false;
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;

  constructor(private authService: AuthService){}

  onToggle(){
    this.sidenav?.toggle();
  }

  ngOnInit(): void {
    this.authService.initAuthListener();
  }
}
