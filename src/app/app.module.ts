import { TrainingService } from './shared/training.service';
import { StopTrainingComponent } from './training/current-trainings/stop-training.component';
import { AppRoutingModule } from './app-routing.module';
import { PastTrainingsComponent } from './training/past-trainings/past-trainings.component';
import { CurrentTrainingsComponent } from './training/current-trainings/current-trainings.component';
import { NewTrainingsComponent } from './training/new-training/new-training.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { TrainingComponent } from './training/training.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AuthService } from './shared/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    TrainingComponent,
    NewTrainingsComponent,
    CurrentTrainingsComponent,
    PastTrainingsComponent,
    HeaderComponent,
    SidenavListComponent,
    StopTrainingComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ AuthService, TrainingService ],
  bootstrap: [AppComponent],
  entryComponents: [StopTrainingComponent]
})
export class AppModule { }
