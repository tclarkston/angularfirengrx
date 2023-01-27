import { IExercise } from './../models/exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TrainingService } from '../training.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UiService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingsComponent implements OnInit, OnDestroy {
  exercises: IExercise[];
  isLoading = true;
  private subs = new Subscription();

  constructor(private trainingService: TrainingService, private uiService: UiService) { }

  ngOnInit(): void {
    this.subs.add(this.uiService.loadingStateChanged.subscribe(res => {
      this.isLoading = res;
    }));
    this.fetchExercises();
    this.trainingService.fetchAvailableExercises();
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
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
    this.subs.add(this.trainingService.exercisesChanged.subscribe(res => {
      this.exercises = res
    }));
  }
}
