import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IExercise } from "../training/models/exercise.model";

@Injectable()
export class TrainingService{
  private availableExercies: IExercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 3 },
    { id: 'lunges', name: 'Lunges', duration: 60, calories: 16 },
    { id: 'burpees', name: 'Burpees', duration: 30, calories: 8 },
  ];
  private runningExercise: any;
  exerciseChanged = new Subject<IExercise>();
  private exercises: IExercise[] = [];

  getAvailableExercises() : IExercise[] {
    return this.availableExercies.slice();
  }

  startExercise(selectedId: string) : void {
    this.runningExercise = this.availableExercies.find(ex => ex.id === selectedId)

    this.exerciseChanged.next({...this.runningExercise });
  }

  completeExercise(){
    this.exercises.push( {
      ...this.runningExercise,
      date: new Date(),
      state: 'Completed'
    });

    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number){
    this.exercises.push( {
      ...this.runningExercise,
      date: new Date(),
      duration: this.runningExercise.duration * (progress /100),
      calories: this.runningExercise.calories * (progress /100),
      state: 'Cancelled'
    });

    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExcercise(): IExercise{
    return { ...this.runningExercise }
  }

  getCompletedOrCancelledExercises(){
    return this.exercises.slice();
  }
}

