import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import * as fromRoot from './../../shared/store/app.reducer'
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavSelected = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
    
    ){}

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onClose(){
    this.sidenavSelected.emit();
  }

  onLogout(){
    this.onClose();
    this.authService.logout();
  }
}
