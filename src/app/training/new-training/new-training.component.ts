import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TrainingService } from './../../shared/training.service';
import { Component, OnInit } from '@angular/core';
import { IExercise } from '../models/exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingsComponent implements OnInit {
  exercises: IExercise[];
  sub: Subscription;

  constructor(private trainingService: TrainingService){

  }

  ngOnInit(): void {
    this.exercises = this.trainingService.getAvailableExercises();
  }

  onStartTraining(form: NgForm){
    this.trainingService.startExercise(form.value.exercise);
  }
}
