import { Store } from '@ngrx/store';
import { IExercise } from './../models/exercise.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { TrainingService } from '../training.service';
import { Component, OnInit } from '@angular/core';
import * as fromRoot from './../../shared/store/app.reducer'
import * as fromTraining from './../store/training.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingsComponent implements OnInit {
  exercises$: Observable<IExercise[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService, 
    private store: Store<fromTraining.State>
    ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.fetchExercises();
  }

  docToDomainObject = _ => {
    return {
      id: _.payload.doc.id,
      ..._.payload.doc.data()
    }
  };

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }
}
