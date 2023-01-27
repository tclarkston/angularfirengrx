import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/auth/auth.service';
import { TrainingService } from './training/training.service';
import { AuthModule } from './auth/auth.module';
import { UiService } from './shared/ui.service';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { reducers } from './shared/store/app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FlexLayoutModule,
    AuthModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [ UiService, TrainingService, AuthService ],
  bootstrap: [ AppComponent ],
  entryComponents: []
})
export class AppModule { }
