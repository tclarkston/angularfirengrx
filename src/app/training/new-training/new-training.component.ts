import { IExercise } from './../models/exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TrainingService } from './../../shared/training.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingsComponent implements OnInit, OnDestroy {
  exercises: IExercise[];
  sub: Subscription;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.sub = this.trainingService.exercisesChanged.subscribe(res => this.exercises = res);
    this.trainingService.fetchAvailableExercises();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
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
}
