import { Store } from '@ngrx/store';
import { UiService } from '../shared/ui.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators'
import { IExercise } from './models/exercise.model';
import * as fromTraining from './store/training.reducer'
import * as UI from './../shared/store/ui.actions';
import * as Training from './store/training.actions'

@Injectable()
export class TrainingService {

  private fbSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UiService,
    private store: Store<fromTraining.State>) { }

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(this.db.collection('availableExercises')
      .snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map(doc => {
          return {
            ...(doc.payload.doc.data() as IExercise),
            id: doc.payload.doc.id
          }
        })
      }))
      .subscribe({
        next: (exercises: IExercise[]) => {
          this.store.dispatch(new UI.StopLoading());
          this.store.dispatch(new Training.SetAvailableTraining(exercises));
        },
        error: (error) => {
          this.store.dispatch(new UI.StopLoading());
          this.uiService.showSnackbar('Fetching Exercises Failed', null, 3000);
        }
      }))
      ;
  }

  startExercise(selectedId: string): void {
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        date: new Date(),
        state: 'Completed'
      });
      this.store.dispatch(new Training.StopTraining())
    });

  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        date: new Date(),
        duration: ex.duration * (progress / 100),
        calories: ex.calories * (progress / 100),
        state: 'Cancelled'
      });
    });

    this.store.dispatch(new Training.StopTraining());
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(this.db.collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: IExercise[]) => {
        this.store.dispatch(new Training.SetFinishedTraining(exercises));
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

