import { AuthService } from 'src/app/auth/auth.service';
import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth: boolean;
  authSubscription: Subscription;

  constructor(private authService: AuthService){

  }

  ngOnInit(): void {
      this.authSubscription = (this.authService.authChange.subscribe(authStatus => {
        this.isAuth = authStatus;
      }));
  }

  ngOnDestroy(): void {
    if (this.authSubscription){
      this.authSubscription.unsubscribe();
    }
  }

  onToggle(){
    this.sidenavToggle.emit();
  }

  onLogout(){
    this.authService.logout()
  }
}
