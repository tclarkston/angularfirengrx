import { UiService } from '../shared/ui.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators'
import { IExercise } from './models/exercise.model';
@Injectable()
export class TrainingService {

  exerciseChanged = new Subject<IExercise>();
  exercisesChanged = new Subject<IExercise[]>();
  finishedExercisesChanged = new Subject<IExercise[]>();

  private availableExercies: IExercise[] = [];
  private runningExercise: any;
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UiService) { }

  fetchAvailableExercises() {
    this.uiService.loadingStateChanged.next(true);
    this.fbSubs.push(this.db.collection('availableExercises')
      .snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            ...(doc.payload.doc.data() as IExercise)
          }
        })
      }))
      .subscribe({
        next: (exercises: IExercise[]) => {
          this.uiService.loadingStateChanged.next(false);
          this.availableExercies = exercises;
          this.exercisesChanged.next([...this.availableExercies])
          this.uiService.loadingStateChanged.next(false);
        },
        error: (error) => {
          this.uiService.loadingStateChanged.next(false);
          this.exerciseChanged.next(null);
          this.uiService.showSnackbar('Fetching Exercises Failed', null, 3000);
        }
      }))
      ;
  }

  startExercise(selectedId: string): void {
    this.runningExercise = this.availableExercies.find(ex => ex.id === selectedId)

    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'Completed'
    });

    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      state: 'Cancelled'
    });

    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExcercise(): IExercise {
    return { ...this.runningExercise }
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(this.db.collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: IExercise[]) => {
        this.finishedExercisesChanged.next(exercises);
      }))
      ;
  }

  cancelSubscriptions() {
    if (this.fbSubs) {
      this.fbSubs.forEach(sub => sub.unsubscribe());
    }
  }
  private addDataToDatabase(exercise: IExercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}

